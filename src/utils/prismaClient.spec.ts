import { describe, it, expect, afterAll } from "bun:test";
import prisma from "./prismaClient";

describe("prismaClient", () => {
  it("should create a user", async () => {
    const createdUser = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      },
    });
    expect(createdUser).toHaveProperty("id");
    expect(createdUser.name).toBe("Test User");
  });

  it("should find a user by email", async () => {
    const foundUser = await prisma.user.findFirst({
      where: {
        email: "test@example.com",
      },
    });
    expect(foundUser).toHaveProperty("email", "test@example.com");
  });
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: {
      email: "test@example.com",
    },
  });
});
