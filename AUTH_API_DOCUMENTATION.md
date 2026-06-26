# Authentication API Documentation

Complete session-based authentication system with multi-device support (max 2 devices per user).

## Features

- ✅ Session-based authentication with access & refresh tokens
- ✅ Multi-device support (max 2 active devices per user)
- ✅ Automatic device management (oldest device logged out when max reached)
- ✅ 15-minute access token expiry with automatic refresh
- ✅ 30-day refresh token expiry
- ✅ Device tracking (name, type, IP, user agent)
- ✅ Secure password hashing with PBKDF2
- ✅ JWT-like token implementation (no external dependencies required)

---

## Setup

### 1. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and set:

```bash
# Generate JWT_SECRET:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Update `.env.local`:
```
JWT_SECRET=<your-generated-secret>
DATABASE_URL=postgresql://user:password@localhost:5432/bim_academy
NODE_ENV=development
```

### 3. Database Migration

```bash
pnpm prisma migrate dev --name update_session_schema
# or
npm run prisma migrate dev --name update_session_schema
```

This will apply the new Session schema with multi-device support.

---

## API Endpoints

### Authentication Routes

#### **POST** `/api/auth/signup`

Create a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "user": {
    "id": "user_xxx",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "session": {
    "id": "session_xxx",
    "deviceName": "Chrome on Windows",
    "createdAt": "2026-06-25T10:30:00Z"
  },
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 900
  }
}
```

**Error Responses:**
- `400`: Missing fields or validation error
- `409`: User already exists

---

#### **POST** `/api/auth/login`

Authenticate user and create a new session.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response (200 OK):**
Same as signup response.

**Notes:**
- If user has 2 active sessions, the oldest one is automatically deactivated
- Each login creates a new session with device information

**Error Responses:**
- `400`: Missing fields
- `401`: Invalid credentials

---

#### **POST** `/api/auth/logout`

Logout from current device (deactivate current session).

**Request:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Error Responses:**
- `401`: Unauthorized or invalid token

---

#### **POST** `/api/auth/refresh`

Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "tokens": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": 900
  }
}
```

**Notes:**
- Called automatically when access token expires
- Returns new access & refresh tokens
- Session expiry is extended by 30 days

**Error Responses:**
- `400`: Refresh token missing
- `401`: Invalid or expired refresh token

---

#### **GET** `/api/auth/sessions`

Get all active sessions for the current user.

**Request:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "sessions": [
    {
      "id": "session_xxx",
      "deviceName": "Chrome on Windows",
      "deviceType": "web",
      "ipAddress": "192.168.1.100",
      "createdAt": "2026-06-25T10:30:00Z",
      "lastUsedAt": "2026-06-25T12:45:00Z"
    },
    {
      "id": "session_yyy",
      "deviceName": "Safari on iPhone",
      "deviceType": "mobile",
      "ipAddress": "192.168.1.101",
      "createdAt": "2026-06-24T15:20:00Z",
      "lastUsedAt": "2026-06-25T09:15:00Z"
    }
  ],
  "count": 2
}
```

**Error Responses:**
- `401`: Unauthorized

---

#### **DELETE** `/api/auth/sessions/[id]`

Logout from a specific device (deactivate specific session).

**Request:**
```
Authorization: Bearer <access_token>
DELETE /api/auth/sessions/session_xxx
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

**Error Responses:**
- `400`: Cannot delete current session (use logout instead)
- `401`: Unauthorized
- `404`: Session not found

---

## Frontend Integration

### Using the Auth Hook

```typescript
import { useAuth } from '@/lib/use-auth';

function MyComponent() {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    signup,
    login,
    logout,
    refreshAccessToken,
    getAccessToken,
  } = useAuth();

  // Login
  const handleLogin = async () => {
    const success = await login('user@example.com', 'password123');
    if (success) {
      // User is logged in, automatic redirect in login/signup components
    }
  };

  // Logout
  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isAuthenticated ? (
        <p>Hello, {user?.name}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </>
  );
}
```

### Using Auth Fetch for Protected API Calls

```typescript
import { authFetch } from '@/lib/auth-fetch';
import { useAuth } from '@/lib/use-auth';

function MyComponent() {
  const { refreshAccessToken } = useAuth();

  const fetchData = async () => {
    const response = await authFetch('/api/some-protected-endpoint', {
      refreshToken: refreshAccessToken,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };
}
```

### Protecting Routes

```typescript
import { ProtectedRoute } from '@/components/protected-route';

export default function SecretPage() {
  return (
    <ProtectedRoute>
      <h1>This page is protected</h1>
      <p>Only authenticated users can see this</p>
    </ProtectedRoute>
  );
}
```

---

## Components

### Login Form
`components/login-form.tsx` - Login component with email/password fields

### Signup Form
`components/signup-form.tsx` - Signup component with validation

### Protected Route
`components/protected-route.tsx` - Wrapper for protected pages, redirects to /sign-in if not authenticated

### Session Manager
`components/session-manager.tsx` - View and manage active sessions, logout from specific devices

---

## Utility Functions

### Auth Utils (`lib/auth-utils.ts`)

```typescript
// Token generation & verification
generateToken(length?: number): string
generateJWTPayload(data: any, expiresIn: number): string
verifyJWTToken(token: string): any

// Password handling
hashPassword(password: string): string
verifyPassword(password: string, hash: string): boolean

// Token hashing
hashToken(token: string): string
verifyTokenHash(rawToken: string, hash: string): boolean

// Device detection
extractDeviceInfo(request: Request): {
  userAgent: string
  ipAddress: string
  deviceType: string
  deviceName: string
}
```

---

## Token Flow Diagram

```
┌─────────────┐
│   LOGIN     │  User submits email/password
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│  Create Session in DB   │  Store device info, token hash
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ Generate Tokens                  │  Access: 15 min
│ - Access Token (15 min)          │  Refresh: 30 days
│ - Refresh Token (30 days)        │
└──────┬──────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Store Refresh Hash in DB        │  For security
└──────┬──────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Send Tokens to Client           │  Client stores in localStorage
│  - accessToken                   │
│  - refreshToken                  │
│  - expiresIn                     │
└──────┬──────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Protected API Request           │  Send: Authorization: Bearer <token>
└──────┬──────────────────────────┘
       │
       ▼
    ┌──▼──┐
    │Valid│───────► Success ✓
    └──┬──┘
       │
     Expired
       │
       ▼
┌──────────────────────────────────┐
│  Call /api/auth/refresh          │  Send refreshToken
└──────┬──────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Verify Refresh Token            │
│  Verify Session Active           │
│  Check Token Hash                │
└──────┬──────────────────────────┘
       │
    ┌──▼──┐
    │Valid│
    └──┬──┘
       │
       ▼
┌──────────────────────────────────┐
│  Generate New Tokens             │
│  - New Access Token              │
│  - New Refresh Token             │
│  - Update Token Hash             │
│  - Extend Session Expiry         │
└──────┬──────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Return New Tokens               │  Continue with new accessToken
└──────────────────────────────────┘
```

---

## Database Schema

### Session Table

```prisma
model Session {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Device info
  deviceName      String   // "Chrome on Windows"
  deviceType      String   // "web", "mobile", "tablet"
  ipAddress       String
  userAgent       String
  
  // Tokens
  refreshTokenHash String  // Hashed refresh token
  accessTokenExp   DateTime // 15 minutes from now
  refreshTokenExp  DateTime // 30 days from now
  
  // Metadata
  isActive        Boolean  @default(true)
  lastUsedAt      DateTime @default(now())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([userId])
  @@index([isActive])
}
```

---

## Security Considerations

1. **Token Storage**: Tokens stored in localStorage (consider using httpOnly cookies for production)
2. **HTTPS**: Always use HTTPS in production
3. **CORS**: Configure CORS appropriately for your domain
4. **JWT_SECRET**: Keep this secret! Generate a strong random value
5. **Rate Limiting**: Implement rate limiting on auth endpoints in production
6. **Token Validation**: Always validate tokens server-side
7. **Session Expiry**: Sessions auto-expire refresh tokens after 30 days
8. **Device Limiting**: Max 2 devices per user prevents unlimited session proliferation

---

## Testing

### Test Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### Test Protected Endpoint
```bash
curl -X GET http://localhost:3000/api/auth/sessions \
  -H "Authorization: Bearer <access_token>"
```

### Test Refresh
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "<refresh_token>"
  }'
```

---

## Troubleshooting

### "Invalid JWT Secret"
- Ensure `JWT_SECRET` is set in `.env.local`
- Restart the development server after changing env variables

### "Session not found"
- Session might have been deleted or expired
- User needs to login again

### "Token expired"
- Access tokens expire after 15 minutes
- Use `/api/auth/refresh` to get new tokens
- Hook automatically handles this

### "CORS error"
- Check CORS configuration
- Ensure requests include proper headers

---

## API Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created (signup) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid token) |
| 404 | Not Found |
| 409 | Conflict (user exists) |
| 500 | Server Error |

---

## Performance Tips

1. **Token Refresh**: Refresh token before expiry (not after) to avoid unnecessary failed requests
2. **Session Cleanup**: Old inactive sessions are automatically cleaned up
3. **Caching**: Don't cache authenticated responses (they contain user-specific data)
4. **Connection**: Use connection pooling for database

---

## Future Enhancements

- [ ] Email verification for signup
- [ ] Password reset functionality
- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, GitHub, etc.)
- [ ] Session activity logs
- [ ] Device trust/remember device option
- [ ] Geolocation detection
- [ ] Suspicious login alerts
