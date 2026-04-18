"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

export function useAuthGate(nextPath: string) {
  const router = useRouter();
  const { data: session, status } = useSession();

  return useMemo(() => {
    return {
      session,
      status,
      requireMemberAndProfile() {
        if (typeof window === "undefined") return false;
        if (status === "loading") return false;
        if (status !== "authenticated" || !session) {
          router.push(`/auth/login?next=${encodeURIComponent(nextPath)}`);
          return false;
        }
        if (!session.user.profileComplete) {
          router.push(`/ayarlar/profil?next=${encodeURIComponent(nextPath)}`);
          return false;
        }
        return true;
      },
    };
  }, [router, session, status, nextPath]);
}
