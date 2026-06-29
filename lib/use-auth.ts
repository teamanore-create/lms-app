'use client';

import { useEffect, useState, useCallback } from 'react';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthSession {
  id: string;
  deviceName: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  user: AuthUser;
  session: AuthSession;
  tokens: AuthTokens;
}

const STORAGE_KEY_ACCESS = 'auth_access_token';
// const STORAGE_KEY_REFRESH = 'auth_refresh_token';
const STORAGE_KEY_USER = 'auth_user';
const STORAGE_KEY_EXPIRY = 'auth_token_expiry';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth from storage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      const storedAccessToken = localStorage.getItem(STORAGE_KEY_ACCESS);
      const storedExpiry = localStorage.getItem(STORAGE_KEY_EXPIRY);

      if (storedUser && storedAccessToken && storedExpiry) {
        const expiryTime = parseInt(storedExpiry);
        const now = Date.now();

        if (expiryTime > now) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          // Token expired, try refresh
          refreshAccessToken();
        }
      }
    } catch (err) {
      console.error('Failed to initialize auth:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkTokenExpiry = () => {
      const expiryTime = localStorage.getItem(STORAGE_KEY_EXPIRY);
      if (!expiryTime) return;

      const timeUntilExpiry = parseInt(expiryTime) - Date.now();
      // Refresh when 1 minute left
      if (timeUntilExpiry > 0 && timeUntilExpiry < 60000) {
        refreshAccessToken();
      }
    };

    const interval = setInterval(checkTokenExpiry, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const signup = useCallback(
    async (email: string, password: string, name: string): Promise<boolean> => {
      try {
        setError(null);
        setIsLoading(true);

        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Signup failed');
        }

        const data: AuthResponse = await response.json();
        storeAuthData(data);
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Signup failed';
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        setError(null);
        setIsLoading(true);

        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Login failed');
        }

        const data: AuthResponse = await response.json();
        storeAuthData(data);
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Login failed';
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      const accessToken = localStorage.getItem(STORAGE_KEY_ACCESS);

      if (accessToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }

      clearAuthData();
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      clearAuthData();
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    try {
      // const refreshToken = localStorage.getItem(STORAGE_KEY_REFRESH);
      // if (!refreshToken) {
      //   clearAuthData();
      //   return false;
      // }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        clearAuthData();
        return false;
      }

      const data = await response.json();
      
      // Update only tokens, keep user data
      localStorage.setItem(STORAGE_KEY_ACCESS, data.tokens.accessToken);
      // localStorage.setItem(STORAGE_KEY_REFRESH, data.tokens.refreshToken);
      localStorage.setItem(
        STORAGE_KEY_EXPIRY,
        (Date.now() + data.tokens.expiresIn * 1000).toString()
      );

      return true;
    } catch (err) {
      console.error('Token refresh error:', err);
      clearAuthData();
      return false;
    }
  }, []);

  const getAccessToken = useCallback((): string | null => {
    return localStorage.getItem(STORAGE_KEY_ACCESS);
  }, []);

  const storeAuthData = (data: AuthResponse) => {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(data.user));
    localStorage.setItem(STORAGE_KEY_ACCESS, data.tokens.accessToken);
    // localStorage.setItem(STORAGE_KEY_REFRESH, data.tokens.refreshToken);
    localStorage.setItem(
      STORAGE_KEY_EXPIRY,
      (Date.now() + data.tokens.expiresIn * 1000).toString()
    );

    setUser(data.user);
    setIsAuthenticated(true);
    setError(null);
  };

  const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_ACCESS);
    // localStorage.removeItem(STORAGE_KEY_REFRESH);
    localStorage.removeItem(STORAGE_KEY_EXPIRY);

    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signup,
    login,
    logout,
    refreshAccessToken,
    getAccessToken,
  };
}
