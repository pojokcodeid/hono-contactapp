import { Context } from "hono";
import { verifyToken } from "../utils/Jwt";

class AccessValidation {
  /**
   * Verifies that the request has a valid Authorization header containing a
   * Bearer token, and that the token is a valid JWT token. If the token is
   * valid, it adds the user ID to the request context and calls the next
   * middleware. If the token is invalid or missing, it returns an HTTP 401
   * response with a JSON object containing an error message.
   *
   * @param c - The request context containing the HTTP request and response objects.
   * @param next - The next middleware to call if the token is valid.
   */
  async validateAccessToken(c: Context, next: () => Promise<void>) {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];
    // check if token is present
    if (!token) {
      return c.json({ message: "Unauthorized", data: null }, 401);
    }
    // check if token is valid
    try {
      const payload = await verifyToken(token);
      c.set("user_id", payload.id);
      await next();
    } catch {
      return c.json({ message: "Unauthorized", data: null }, 401);
    }
  }
}

export default new AccessValidation();
