import { User } from "@prisma/client";
import { expect, it, describe, beforeAll, afterAll } from "bun:test";
import UserModel from "./UserModel";
import prisma from "../utils/prismaClient";

// Mock data
const user = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  password: "password",
} as User;

describe("UserModel Tests", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany(); // Clear users before tests
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a user", async () => {
    const createdUser = await UserModel.create(user);
    expect(createdUser).toHaveProperty("id");
    expect(createdUser.email).toBe(user.email);
    expect(createdUser.password).toBe("********"); // Password should be hidden
  });

  it("should update a user", async () => {
    const updatedUser = await UserModel.update(user.id, {
      ...user,
      name: "Updated User",
    });
    expect(updatedUser.name).toBe("Updated User");
  });

  it("should find a user by email", async () => {
    const foundUser = await UserModel.findByEmail(user.email);
    expect(foundUser).toHaveProperty("email", user.email);
  });

  it("should verify user", async () => {
    const verifiedUser = await UserModel.verifyUser(user.email, user.password);
    expect(verifiedUser).toHaveProperty("email", user.email);
  });

  it("should delete a user", async () => {
    const deletedUser = await UserModel.delete(user.id);
    expect(deletedUser).toHaveProperty("id");
  });
});
