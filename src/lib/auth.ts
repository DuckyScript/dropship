/**
 * Admin API Authentication Utility
 * Validates API keys for securing admin endpoints
 */

export function validateAdminApiKey(apiKey: string | null): boolean {
  const validApiKey = process.env.ADMIN_API_KEY;
  
  if (!validApiKey) {
    console.warn('ADMIN_API_KEY is not configured');
    return false;
  }
  
  if (!apiKey) {
    return false;
  }
  
  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(apiKey),
    Buffer.from(validApiKey)
  );
}

export function getApiKeyFromRequest(request: Request): string | null {
  // Check Authorization header (Bearer token)
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Check X-API-Key header
  const apiKeyHeader = request.headers.get('x-api-key');
  if (apiKeyHeader) {
    return apiKeyHeader;
  }
  
  return null;
}
