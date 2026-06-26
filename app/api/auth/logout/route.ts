import  prisma  from '@/lib/db';

import { verifyAccessToken } from '@/lib/auth-middleware';

export async function POST(request: Request) {
  try {
    const auth = verifyAccessToken(request);

    if (!auth) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mark session as inactive
    await prisma.session.update({
      where: { id: auth.sessionId },
      data: { isActive: false },
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Logged out successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
