"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import type { RefreshResponse } from "@/types";

/**
 * Proactive token refresh component.
 * 
 * Decodes the access token to determine its expiry, then schedules a
 * silent refresh ~60 seconds before it expires. Runs entirely in the
 * background — renders nothing.
 */
export function AuthInitializer() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!isAuthenticated || !accessToken) return;

    // Decode the JWT to get expiry (without verifying signature — only used client-side)
    const expiry = getTokenExpiry(accessToken);
    if (!expiry) return;

    const now = Date.now();
    // Refresh 60 seconds before expiry, minimum 5 seconds from now
    const refreshAt = Math.max(expiry - 60_000, now + 5_000);
    const delay = refreshAt - now;

    timerRef.current = setTimeout(async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          credentials: "include", // send httpOnly cookie
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Refresh failed");
        }

        const data: RefreshResponse & { user?: { id: string; email: string; name: string } } =
          await response.json();

        if (data.success && data.accessToken) {
          setAccessToken(data.accessToken);
          if (data.user) {
            setUser(data.user);
          }
        } else {
          throw new Error("Refresh response invalid");
        }
      } catch {
        // Refresh failed — clear auth
        clearAuth();
      }
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [accessToken, isAuthenticated, setAccessToken, setUser, clearAuth]);

  return null;
}

// ─── Helper: decode JWT expiry ───────────────────────────────
function getTokenExpiry(token: string): number | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    // base64url → base64 → decode
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));

    if (decoded.exp) {
      return decoded.exp * 1000; // Convert seconds → ms
    }
    return null;
  } catch {
    return null;
  }
}
