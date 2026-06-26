import crypto from 'crypto';

// Token expiration times
export const TOKEN_EXPIRY = {
  ACCESS_TOKEN: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN: 30 * 24 * 60 * 60 * 1000, // 30 days
};

/**
 * Generate a random token
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash a token using SHA256
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Verify if raw token matches the hash
 */
export function verifyTokenHash(rawToken: string, hash: string): boolean {
  const tokenHash = hashToken(rawToken);
  return crypto.timingSafeEqual(Buffer.from(tokenHash, 'hex'), Buffer.from(hash, 'hex'));
}

/**
 * Generate a numeric OTP string
 */
export function generateOtp(): string {
  const otp = crypto.randomInt(100000, 1000000);
  return otp.toString();
}

/**
 * Hash a 6-digit OTP
 */
export function hashOtp(otp: string): string {
  return hashToken(otp);
}

/**
 * Verify OTP against stored hash
 */
export function verifyOtp(otp: string, hash: string): boolean {
  return verifyTokenHash(otp, hash);
}

/**
 * Generate JWT-like token payload (manual implementation without external library)
 */
export function generateJWTPayload(data: any, expiresIn: number): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    ...data,
    iat: now,
    exp: now + Math.floor(expiresIn / 1000),
  };
  
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  
  // Sign with a secret
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${encodedPayload}`)
    .digest('base64url');
  
  return `${header}.${encodedPayload}.${signature}`;
}

/**
 * Verify JWT token
 */
export function verifyJWTToken(token: string): any {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const [header, payload, signature] = token.split('.');
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${header}.${payload}`)
      .digest('base64url');
    
    if (signature !== expectedSignature) {
      return null;
    }
    
    // Decode payload
    const decodedPayload = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf-8')
    );
    
    // Check expiration
    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return decodedPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Extract device info from request headers
 */
export function extractDeviceInfo(request: Request) {
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Parse device type and name
  const deviceType = getDeviceType(userAgent);
  const deviceName = getDeviceName(userAgent, deviceType);
  
  return {
    userAgent,
    ipAddress: ip.split(',')[0].trim(),
    deviceType,
    deviceName,
  };
}

/**
 * Determine device type from user agent
 */
function getDeviceType(userAgent: string): string {
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('mobile') || ua.includes('android')) return 'mobile';
  if (ua.includes('tablet') || ua.includes('ipad')) return 'tablet';
  return 'web';
}

/**
 * Generate device name from user agent
 */
function getDeviceName(userAgent: string, deviceType: string): string {
  const ua = userAgent.toLowerCase();
  
  // Browser
  let browser = 'Unknown Browser';
  if (ua.includes('chrome') && !ua.includes('chromium')) browser = 'Chrome';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('edge')) browser = 'Edge';
  else if (ua.includes('opera') || ua.includes('opr')) browser = 'Opera';
  
  // OS
  let os = 'Unknown OS';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
  
  return `${browser} on ${os}`;
}

/**
 * Hash password using built-in crypto (simple implementation)
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');
  return `${salt}$${hash}`;
}

/**
 * Verify password against hash
 */
export function verifyPassword(password: string, hash: string): boolean {
  try {
    const [salt, originalHash] = hash.split('$');
    const newHash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return newHash === originalHash;
  } catch (error) {
    return false;
  }
}
