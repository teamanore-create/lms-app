// ─── User ────────────────────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Auth ────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  id: string;
  deviceName: string;
  deviceType?: string;
  ipAddress?: string;
  createdAt: string;
  lastUsedAt?: string;
}

/** GET /api/auth/me */
export interface MeResponse {
  success: boolean;
  user: AuthUser;
}

/** POST /api/auth/login */
export interface LoginResponse {
  success: boolean;
  accessToken: string;
  user: AuthUser;
  session: AuthSession;
}

/** POST /api/auth/signup */
export interface SignupResponse {
  success: boolean;
  message: string;
}

/** POST /api/auth/verify-otp */
export interface VerifyOtpResponse {
  success: boolean;
  accessToken: string;
  user: AuthUser;
  session: AuthSession;
}

/** POST /api/auth/resend-otp */
export interface ResendOtpResponse {
  success: boolean;
  message: string;
}

/** POST /api/auth/forgot-password */
export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

/** POST /api/auth/reset-password */
export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

/** POST /api/auth/refresh */
export interface RefreshResponse {
  success: boolean;
  accessToken: string;
  session: AuthSession;
}

/** GET /api/auth/sessions */
export interface SessionsResponse {
  success: boolean;
  sessions: AuthSession[];
  count: number;
}

/** POST /api/auth/logout */
export interface LogoutResponse {
  success: boolean;
  message: string;
}

/** Generic API error shape */
export interface ApiError {
  error?: string;
  errors?: Record<string, string[]>;
  message?: string;
}

// ─── Course ──────────────────────────────────────────────────
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  instructor: string;
  instructor_id?: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  students: number;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Enrollment ──────────────────────────────────────────────
export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: Date;
  progress: number;
}

// ─── Testimonial ─────────────────────────────────────────────
export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  image: string;
  rating: number;
  createdAt: Date;
}

// ─── Generic API Response ────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
