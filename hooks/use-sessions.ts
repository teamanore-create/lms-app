"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import type { SessionsResponse, AuthSession } from "@/types";

// ─── Query Key ───────────────────────────────────────────────
export const sessionKeys = {
  all: ["sessions"] as const,
};

// ─── Fetch Sessions Query ────────────────────────────────────
export function useSessions() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<AuthSession[]>({
    queryKey: sessionKeys.all,
    queryFn: async () => {
      const { data } = await api.get<SessionsResponse>("/api/auth/sessions");
      return data.sessions;
    },
    enabled: isAuthenticated, // only fetch when logged in
    staleTime: 30 * 1000,    // 30 seconds
    refetchOnWindowFocus: true,
  });
}

// ─── Delete Session Mutation ─────────────────────────────────
export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (sessionId: string) => {
      await api.delete(`/api/auth/sessions/${sessionId}`);
    },
    onSuccess: () => {
      // Refetch sessions list after deletion
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}

// ─── Delete Multiple Sessions Mutation ──────────────────────────
export function useDeleteSessions() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string[]>({
    mutationFn: async (sessionIds: string[]) => {
      await api.delete("/api/auth/sessions", {
        data: {
          sessionIds,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
    },
  });
}
