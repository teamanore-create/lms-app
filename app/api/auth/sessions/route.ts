import  prisma  from '@/lib/db';

import { verifyAccessToken, withAuth } from '@/lib/auth-middleware';

export async function GET(request: Request) {
  return withAuth(request, async (auth) => {
    try {
      // Get all active sessions for the user
      const sessions = await prisma.session.findMany({
        where: {
          userId: auth.userId,
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
console.log(sessions)
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

// export async function DELETE(request: Request) {
//   return withAuth(request, async (auth) => {
//     try {
//       const { sessionIds } = await request.json();

//       if (
//         !Array.isArray(sessionIds) ||
//         sessionIds.length === 0
//       ) {
//         return new Response(
//           JSON.stringify({
//             error: "Session IDs are required.",
//           }),
//           {
//             status: 400,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//       }

//       // Prevent deleting the current session
//       if (sessionIds.includes(auth.sessionId)) {
//         return new Response(
//           JSON.stringify({
//             error: "Cannot delete the current session. Use logout instead.",
//           }),
//           {
//             status: 400,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//       }

//       const result = await prisma.session.deleteMany({
//         where: {
//           id: {
//             in: sessionIds,
//           },
//           userId: auth.userId,
//         },
//       });

//       return new Response(
//         JSON.stringify({
//           success: true,
//           deletedCount: result.count,
//           message: `${result.count} session(s) deleted successfully.`,
//         }),
//         {
//           status: 200,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Delete sessions error:", error);

//       return new Response(
//         JSON.stringify({
//           error: "Internal server error",
//         }),
//         {
//           status: 500,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     }
//   });
// }