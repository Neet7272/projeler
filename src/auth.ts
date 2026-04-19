import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { computeProfileComplete } from "@/lib/profile";
import { resolveRole } from "@/lib/authRole";
import { authConfig } from "@/auth.config";

const googleId =
  process.env.AUTH_GOOGLE_ID?.trim() || process.env.GOOGLE_CLIENT_ID?.trim();
const googleSecret =
  process.env.AUTH_GOOGLE_SECRET?.trim() ||
  process.env.GOOGLE_CLIENT_SECRET?.trim();
const googleConfigured = Boolean(googleId && googleSecret);

const providers = [
  ...(googleConfigured
    ? [
        Google({
          clientId: googleId!,
          clientSecret: googleSecret!,
          allowDangerousEmailAccountLinking: false,
        }),
      ]
    : []),
];

/**
 * Node: PrismaAdapter (Google OAuth Account tablosu).
 * Middleware yalnızca `auth.config.ts` kullanır (Edge uyumlu).
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        const uid = user.id ?? (user as { sub?: string }).sub;
        if (uid) {
          token.id = uid;
          token.sub = uid;
          const dbUser = await prisma.user.findUnique({ where: { id: uid } });
          if (dbUser) {
            token.role = dbUser.role;
            token.profileComplete = computeProfileComplete(dbUser);
            if (dbUser.image) {
              token.picture = dbUser.image;
            }
            if (dbUser.email) {
              token.email = dbUser.email;
            }
          } else {
            const u = user as { role?: "ADMIN" | "MEMBER"; email?: string | null };
            token.role = u.role ?? "MEMBER";
            if (typeof u.email === "string") token.email = u.email;
          }
        }
      }
      const id = (token.id ?? token.sub) as string | undefined;
      if (trigger === "update" && id) {
        const dbUser = await prisma.user.findUnique({
          where: { id },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.profileComplete = computeProfileComplete(dbUser);
          if (dbUser.image) {
            token.picture = dbUser.image;
          }
          if (dbUser.email) {
            token.email = dbUser.email;
          }
        }
      }
      token.role = resolveRole({
        role: token.role,
        email: (token.email as string | null | undefined) ?? null,
      });
      return token;
    },
  },
});
