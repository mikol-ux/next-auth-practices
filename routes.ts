/**
 * does not require authentication
 *@type {string[]}
 */
export const publicRoutes = ["/"];
/**
 *used for authentication
 *@type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];
/**
 * the prefix for authentication
 *@type {string}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * the prefix for authentication
 *@type {string}
 */
export const DEFAULT_LOGON_REDIRECT = "/setting";
