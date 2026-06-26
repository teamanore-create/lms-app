"use client";

import axios from "axios";
import { useAuthStore } from "@/store/auth-store";
import type { RefreshResponse } from "@/types";

// ─── Axios Instance ──────────────────────────────────────────
const api = axios.create({
  baseURL: "",           // same-origin (Next.js API routes)
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // send httpOnly cookies (refreshToken)
});

// ─── Request Interceptor: attach Bearer token ────────────────
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor: silent refresh on 401 ─────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh on 401 and not for the refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/refresh") &&
      !originalRequest.url?.includes("/api/auth/login")
    ) {
      if (isRefreshing) {
        // Queue this request while another refresh is in-flight
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint — the cookie is sent automatically
        const { data } = await axios.post<RefreshResponse>(
          "/api/auth/refresh",
          {},
          { withCredentials: true },
        );

        if (data.success && data.accessToken) {
          const store = useAuthStore.getState();
          store.setAccessToken(data.accessToken);

          // If the refresh response includes user info, update it
          if ("user" in data && (data as any).user) {
            store.setUser((data as any).user);
          }

          processQueue(null, data.accessToken);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(originalRequest);
        } else {
          throw new Error("Refresh failed");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Clear auth state — session is invalid
        useAuthStore.getState().clearAuth();

        // Redirect to sign-in (only in browser)
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
