import prisma from '@/lib/db';

import { withAuth } from '@/lib/auth-middleware';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAuth(request, async (auth) => {
    try {
      const { id: sessionId } = await params;
      // Verify the session belongs to the user
      if (!sessionId) {
        return new Response(
          JSON.stringify({ error: 'Session ID is required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
      });

      if (!session || session.userId !== auth.userId) {
        return new Response(
          JSON.stringify({ error: 'Session not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Cannot delete the current session
      if (sessionId === auth.sessionId) {
        return new Response(
          JSON.stringify({ error: 'Cannot delete current session. Use logout instead.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Delete the session
      await prisma.session.delete({
        where: {
          id: sessionId,
        },
      });

      return new Response(
        JSON.stringify({ success: true, message: 'Session deleted successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Delete session error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  });
}
