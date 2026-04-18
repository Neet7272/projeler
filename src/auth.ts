import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { computeProfileComplete } from "@/lib/profile";
import { authConfig } from "@/auth.config";

/**
 * Route handler / Server Components / signIn — Node runtime; Prisma + bcrypt burada.
 * Middleware için ayrı örnek: `NextAuth(authConfig)` → `src/middleware.ts`.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
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
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        const u = user as {
          id: string;
          role: "ADMIN" | "MEMBER";
        };
        token.id = u.id;
        token.sub = u.id;
        token.role = u.role;
        const dbUser = await prisma.user.findUnique({ where: { id: u.id } });
        if (dbUser) {
          token.profileComplete = computeProfileComplete(dbUser);
        }
      }
      const uid = (token.id ?? token.sub) as string | undefined;
      if (trigger === "update" && uid) {
        const dbUser = await prisma.user.findUnique({
          where: { id: uid },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.profileComplete = computeProfileComplete(dbUser);
        }
      }
      return token;
    },
  },
});
