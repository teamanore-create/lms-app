'use client';

/**
 * Fetch wrapper for authenticated API calls
 * Automatically adds Authorization header and handles token refresh
 */
export async function authFetch(
  url: string,
  options: RequestInit & { refreshToken?: () => Promise<boolean> } = {}
): Promise<Response> {
  const { refreshToken, ...fetchOptions } = options;
  
  // Get access token from storage
  const accessToken = localStorage.getItem('auth_access_token');
  
  // Add Authorization header if token exists
  const headers = new Headers(fetchOptions.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  
  let response = await fetch(url, {
    ...fetchOptions,
    headers,
  });
  
  // If 401 and refresh token handler provided, try refresh
  if (response.status === 401 && refreshToken) {
    const refreshed = await refreshToken();
    if (refreshed) {
      const newAccessToken = localStorage.getItem('auth_access_token');
      if (newAccessToken) {
        headers.set('Authorization', `Bearer ${newAccessToken}`);
        response = await fetch(url, {
          ...fetchOptions,
          headers,
        });
      }
    }
  }
  
  return response;
}
