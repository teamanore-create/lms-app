import { verifyJWTToken } from './auth-utils';
import  prisma  from './db';

export interface AuthRequest {
  userId: string;
  sessionId: string;
  email?: string;
}

/**
 * Verify access token from Authorization header
 */
export function verifyAccessToken(request: Request): AuthRequest | null {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7);
    const payload = verifyJWTToken(token);
    
    if (!payload || !payload.userId || !payload.sessionId) {
      return null;
    }
    
    return {
      userId: payload.userId,
      sessionId: payload.sessionId,
      email: payload.email,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Middleware to verify access token and attach user to request
 */
export async function withAuth(request: Request, handler: (auth: AuthRequest, req: Request) => Promise<Response>) {
  const auth = verifyAccessToken(request);
  
  if (!auth) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized - Invalid or expired token' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  // Verify session is still active
  const session = await prisma.session.findUnique({
    where: { id: auth.sessionId },
  });
  
  if (!session) {
    return new Response(
      JSON.stringify({ error: 'Session not found or expired' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  // Update last used time
  await prisma.session.update({
    where: { id: auth.sessionId },
    data: { lastUsedAt: new Date() },
  });
  
  return handler(auth, request);
}

/**
 * Extract and verify refresh token from request body
 */
export async function verifyRefreshToken(token: string): Promise<{ userId: string; sessionId: string } | null> {
  try {
    const payload = verifyJWTToken(token);
    
    if (!payload || !payload.userId || !payload.sessionId || payload.type !== 'refresh') {
      return null;
    }
    
    // Verify session and refresh token hash
    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
    });
    
    if (!session) {
      return null;
    }
    
    // For now, we'll use simple verification
    // In production, verify the token hash
    const tokenHash = require('crypto')
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    if (session.refreshTokenHash !== tokenHash) {
      return null;
    }
    
    return {
      userId: payload.userId,
      sessionId: payload.sessionId,
    };
  } catch (error) {
    return null;
  }
}
