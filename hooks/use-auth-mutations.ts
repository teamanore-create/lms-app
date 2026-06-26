"use client";

import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/auth-store";
import type {
  LoginResponse,
  SignupResponse,
  VerifyOtpResponse,
  ResendOtpResponse,
  LogoutResponse,
  ApiError,
} from "@/types";
import { AxiosError } from "axios";

// ─── Helper: extract error message from Axios error ──────────
function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as ApiError;
    if (data.error) return data.error;
    if (data.errors?.email?.[0]) return data.errors.email[0];
    if (data.message) return data.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

// ─── Login Mutation ──────────────────────────────────────────
interface LoginInput {
  email: string;
  password: string;
}

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (input) => {
      const { data } = await api.post<LoginResponse>(
        "/api/auth/login",
        input,
      );
      return data;
    },
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
    },
    onError: (error) => {
      // Error is available via mutation.error
      console.error("Login failed:", getErrorMessage(error));
    },
  });
}

// ─── Signup Mutation ─────────────────────────────────────────
interface SignupInput {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

export function useSignup() {
  const setPendingEmail = useAuthStore((s) => s.setPendingEmail);

  return useMutation<SignupResponse, Error, SignupInput>({
    mutationFn: async (input) => {
      const { data } = await api.post<SignupResponse>(
        "/api/auth/signup",
        input,
      );
      return data;
    },
    onSuccess: (_data, variables) => {
      // OTP has been sent — track the email for the verification step
      setPendingEmail(variables.email);
    },
    onError: (error) => {
      console.error("Signup failed:", getErrorMessage(error));
    },
  });
}

// ─── Verify OTP Mutation ─────────────────────────────────────
interface VerifyOtpInput {
  email: string;
  otp: string;
}

export function useVerifyOtp() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<VerifyOtpResponse, Error, VerifyOtpInput>({
    mutationFn: async (input) => {
      const { data } = await api.post<VerifyOtpResponse>(
        "/api/auth/verify-otp",
        input,
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        setAuth(data.user, data.accessToken);
      }
    },
    onError: (error) => {
      console.error("OTP verification failed:", getErrorMessage(error));
    },
  });
}

// ─── Resend OTP Mutation ─────────────────────────────────────
interface ResendOtpInput {
  email: string;
}

export function useResendOtp() {
  return useMutation<ResendOtpResponse, Error, ResendOtpInput>({
    mutationFn: async (input) => {
      const { data } = await api.post<ResendOtpResponse>(
        "/api/auth/resend-otp",
        input,
      );
      return data;
    },
    onError: (error) => {
      console.error("Resend OTP failed:", getErrorMessage(error));
    },
  });
}

// ─── Logout Mutation ─────────────────────────────────────────
export function useLogout() {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: async () => {
      const { data } = await api.post<LogoutResponse>("/api/auth/logout");
      return data;
    },
    onSuccess: () => {
      clearAuth();
    },
    onError: () => {
      // Even if the server call fails, clear local auth state
      clearAuth();
    },
  });
}

// Re-export the helper for use in components
export { getErrorMessage };
