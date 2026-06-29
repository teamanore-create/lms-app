"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import api from "@/lib/axios";
import type { MeResponse } from "@/types";

/**
 * Proactive auth initializer.
 */
export function AuthInitializer() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  console.log("Auth Initializer")
  useQuery<MeResponse, Error, MeResponse, readonly ["auth", "me"]>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const { data } = await api.get<MeResponse>("/api/auth/me");
        if (data.user) {
          setUser(data.user);
        }
        return data;
      } catch (error) {
        clearAuth();
        throw error;
      }
    },
    enabled: isHydrated && !!accessToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return null;
}
