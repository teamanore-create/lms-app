"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthUser } from "@/types";

// ─── State Shape ─────────────────────────────────────────────
interface AuthState {
  /** Current authenticated user (null when logged out) */
  user: AuthUser | null;
  /** JWT access token (null when logged out) */
  accessToken: string | null;
  /** Email pending OTP verification during signup */
  pendingEmail: string | null;
  /** True once the persisted state has been rehydrated from localStorage */
  isHydrated: boolean;

  // ── Computed ──
  isAuthenticated: boolean;
}

// ─── Actions ─────────────────────────────────────────────────
interface AuthActions {
  /** Set user + accessToken after login or OTP verification */
  setAuth: (user: AuthUser, accessToken: string) => void;
  /** Update only the access token (after silent refresh) */
  setAccessToken: (accessToken: string) => void;
  /** Update user data (e.g. after a refresh that returns user info) */
  setUser: (user: AuthUser) => void;
  /** Clear all auth state (logout) */
  clearAuth: () => void;
  /** Track the email that needs OTP verification (signup flow) */
  setPendingEmail: (email: string | null) => void;
  /** Called by zustand/persist when rehydration is complete */
  setHydrated: (hydrated: boolean) => void;
}

export type AuthStore = AuthState & AuthActions;

// ─── Store ───────────────────────────────────────────────────
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // ── Initial state ──
      user: null,
      accessToken: null,
      pendingEmail: null,
      isHydrated: false,
      isAuthenticated: false,

      // ── Actions ──
      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true, pendingEmail: null }),

      setAccessToken: (accessToken) => set({ accessToken }),

      setUser: (user) => set({ user }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          pendingEmail: null,
        }),

      setPendingEmail: (email) => set({ pendingEmail: email }),

      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: "bim-auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields — not pendingEmail or isHydrated
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        // We recalculate isAuthenticated from the presence of user+token
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // After rehydration, mark isAuthenticated based on stored data
          state.setHydrated(true);
          if (state.user && state.accessToken) {
            state.setAuth(state.user, state.accessToken);
          }
        }
      },
    },
  ),
);
