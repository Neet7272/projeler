import type { NextAuthConfig } from "next-auth";
import { resolveRole } from "@/lib/authRole";

/**
 * Edge (middleware) ile paylaşılan yapılandırma — Node-only modül içe aktarma yok
 * (bcrypt, prisma, pg vb. middleware paketine girmemeli).
 */
export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.AUTH_SECRET,
  pages: { signIn: "/auth/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as {
          id?: string;
          sub?: string;
          role?: "ADMIN" | "MEMBER";
          email?: string | null;
        };
        const id = u.id ?? u.sub;
        if (id) {
          token.id = id;
          token.sub = id;
        }
        if (typeof u.email === "string") {
          token.email = u.email;
        }
        token.role = u.role ?? "MEMBER";
      }
      token.role = resolveRole({
        role: token.role,
        email: (token.email as string | null | undefined) ?? null,
      });
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const id = (token.id ?? token.sub) as string;
        session.user.id = id;
        session.user.role = resolveRole({
          role: token.role,
          email: session.user.email ?? (token.email as string | null | undefined),
        });
        session.user.profileComplete = Boolean(token.profileComplete);
        if (typeof token.picture === "string" && token.picture.length > 0) {
          session.user.image = token.picture;
        }
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
