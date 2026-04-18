import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { computeProfileComplete } from "@/lib/profile";
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
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "E-posta", type: "email" },
      password: { label: "Şifre", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email?.toString().trim().toLowerCase();
      const password = credentials?.password?.toString() ?? "";
      if (!email || !password) return null;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user?.passwordHash) {
        return null;
      }

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return null;

      return {
        id: user.id,
        sub: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
      };
    },
  }),
];

/**
 * Node: PrismaAdapter (Google OAuth Account tablosu) + Credentials.
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
          } else {
            const u = user as { role?: "ADMIN" | "MEMBER" };
            token.role = u.role ?? "MEMBER";
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
        }
      }
      return token;
    },
  },
});
