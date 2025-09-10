/**
 * Example service functions demonstrate separating business logic from route handlers.
 *
 * Keep handler functions small and delegate work into services that:
 * - Are easy to test in isolation
 * - Can be reused across routes/modules
 *
 * Per best practices:
 * - Use functions or an abstract class with static methods for non-request
 *   dependent services.
 * - For request-dependent services, prefer an Elysia instance plugin.
 */
export const echo = (message: string) => ({ echoed: message });
