import { sign, verify } from "hono/jwt";
import { type User } from "@prisma/client";

const secret = (process.env.JWT_SECRET as string) || "secret_password";
const expired =
  Number(process.env.JWT_EXPIRES_IN) || Math.floor(Date.now() / 1000) + 60 * 15; // Token expires in 15 minutes
const secretRefresh =
  (process.env.JWT_SECRET_REFRESH as string) || "secret_refresh";
const expiredRefresh =
  Number(process.env.JWT_REFRESH_EXPIRES_IN) ||
  Math.floor(Date.now() / 1000) + 60 * 60 * 24; // Token expires in 24 hours

/**
 * Generates a JWT access token for a given user object.
 *
 * @param objSub - A user object.
 * @returns A promise that resolves to the JWT access token.
 */
export const generateAccessToken = async (objSub: User) => {
  const payload = {
    id: objSub.id,
    sub: objSub,
    exp: expired,
  };
  const token = await sign(payload, secret);
  return token;
};
export const generateRefreshToken = async (objSub: User) => {
  const payload = {
    id: objSub.id,
    sub: objSub,
    exp: expiredRefresh,
  };
  const token = await sign(payload, secretRefresh);
  return token;
};

/**
 * Verifies a JWT access token, returning the payload if it is valid.
 *
 * @param token - The JWT access token to verify.
 * @returns A promise that resolves to the payload of the token if it is valid.
 * @throws {Error} If the token is invalid, expired, or otherwise cannot be verified.
 */
export const verifyToken = async (token: string) => {
  try {
    const payload = await verify(token, secret);
    return payload;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
export const verifyRefreshToken = async (token: string) => {
  try {
    const payload = await verify(token, secretRefresh);
    return payload;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
