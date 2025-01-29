import { describe, it, expect } from "bun:test";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyToken,
} from "./Jwt";
import { User } from "@prisma/client";

const mockUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  password: "password",
} as User;

describe("JWT Utility Tests", () => {
  it("should generate a valid access token", async () => {
    const token = await generateAccessToken(mockUser);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  it("should verify a valid token", async () => {
    const token = await generateAccessToken(mockUser);
    const payload = await verifyToken(token);
    expect(payload).toHaveProperty("id", mockUser.id);
    expect(payload).toHaveProperty("sub", mockUser);
  });

  it("should throw an error for an invalid token", async () => {
    try {
      await verifyToken("invalid.token");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("should generate a valid refresh token", async () => {
    const token = await generateRefreshToken(mockUser);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(0);
  });

  it("should verify a valid refresh token", async () => {
    const token = await generateRefreshToken(mockUser);
    const payload = await verifyRefreshToken(token);
    expect(payload).toHaveProperty("id", mockUser.id);
    expect(payload).toHaveProperty("sub", mockUser);
  });

  it("should throw an error for an invalid refresh token", async () => {
    try {
      await verifyRefreshToken("invalid.token");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
