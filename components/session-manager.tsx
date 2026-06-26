'use client';

import { useSessions, useDeleteSession } from '@/hooks/use-sessions';
import { useLogout } from '@/hooks/use-auth-mutations';
import { LogOut, Trash2, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SessionManager() {
  const router = useRouter();
  const { data: sessions, isLoading, error } = useSessions();
  const deleteSessionMutation = useDeleteSession();
  const logoutMutation = useLogout();

  const handleDeleteSession = (sessionId: string) => {
    deleteSessionMutation.mutate(sessionId);
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('/sign-in');
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Active Sessions</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error instanceof Error ? error.message : 'Failed to fetch sessions'}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <Loader className="inline animate-spin text-blue-600 mb-2" size={24} />
          <p className="text-neutral-600">Loading sessions...</p>
        </div>
      ) : !sessions || sessions.length === 0 ? (
        <p className="text-neutral-600 text-center py-8">No active sessions</p>
      ) : (
        <div className="space-y-4 mb-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900">{session.deviceName}</h3>
                <p className="text-sm text-neutral-600">
                  IP: {session.ipAddress} • {session.deviceType}
                </p>
                <p className="text-xs text-neutral-500">
                  Created: {new Date(session.createdAt).toLocaleDateString()} •
                  Last used: {session.lastUsedAt ? new Date(session.lastUsedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <button
                onClick={() => handleDeleteSession(session.id)}
                disabled={deleteSessionMutation.isPending && deleteSessionMutation.variables === session.id}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                title="Delete this session"
              >
                {deleteSessionMutation.isPending && deleteSessionMutation.variables === session.id ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <Trash2 size={20} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className="w-full flex items-center justify-center gap-2 btn-secondary text-red-600 border-red-300 disabled:opacity-50"
      >
        {logoutMutation.isPending ? (
          <Loader size={20} className="animate-spin" />
        ) : (
          <LogOut size={20} />
        )}
        Logout from All Devices
      </button>
    </div>
  );
}
