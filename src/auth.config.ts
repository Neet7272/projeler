import type { NextAuthConfig } from "next-auth";

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
        const u = user as { id: string; role: "ADMIN" | "MEMBER" };
        token.id = u.id;
        token.sub = u.id;
        token.role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const id = (token.id ?? token.sub) as string;
        session.user.id = id;
        session.user.role = token.role as "ADMIN" | "MEMBER";
        session.user.profileComplete = Boolean(token.profileComplete);
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
