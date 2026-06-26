import  prisma  from '@/lib/db';

import { verifyAccessToken, withAuth } from '@/lib/auth-middleware';

export async function GET(request: Request) {
  return withAuth(request, async (auth) => {
    try {
      // Get all active sessions for the user
      const sessions = await prisma.session.findMany({
        where: {
          userId: auth.userId,
          isActive: true,
        },
        select: {
          id: true,
          deviceName: true,
          deviceType: true,
          ipAddress: true,
          createdAt: true,
          lastUsedAt: true,
        },
        orderBy: { lastUsedAt: 'desc' },
      });

      return new Response(
        JSON.stringify({
          success: true,
          sessions,
          count: sessions.length,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Get sessions error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  });
}
