import { describe, it, expect, afterAll, beforeAll } from "bun:test";
import UserModel from "../src/models/UserModel";
import prisma from "../src/utils/prismaClient";

const BASE_URL = "http://localhost:3000/api";
let token = "";
let refreshToken = "";
const dummyUser = {
  name: "John Doe",
  email: "john@example.com",
  password: "StrongPassword@123",
  confirmPassword: "StrongPassword@123",
};

beforeAll(async () => {
  await prisma.$connect();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$executeRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("REST API USERS", () => {
  it("should create a new user with POST /api/users", async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dummyUser),
    });

    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body.message).toEqual("User created successfully");
    expect(body.data).toHaveProperty("id");
  });

  it("should login a user with POST /api/login", async () => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: dummyUser.email,
        password: dummyUser.password,
      }),
    });

    const body = await response.json();
    token = body.data.token;
    refreshToken = body.data.refreshToken;
    expect(response.status).toBe(200);
    expect(body.message).toEqual("User logged in successfully");
    expect(body.data).toHaveProperty("token");
  });

  it("should refresh token with POST /api/refresh", async () => {
    const response = await fetch(`${BASE_URL}/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const body = await response.json();
    token = body.data.token;
    expect(response.status).toBe(200);
    expect(body.message).toEqual("Token refreshed successfully");
    expect(body.data).toHaveProperty("token");
  });

  it("should refresh unathorize if use invalid token", async () => {
    const response = await fetch(`${BASE_URL}/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer ivalid-token",
      },
    });

    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should update a user with PUT /api/users/:id", async () => {
    const users = await UserModel.findAll();
    const id = users[0].id;
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dummyUser),
    });

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toEqual("User updated successfully");
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if update user without token", async () => {
    const users = await UserModel.findAll();
    const id = users[0].id;
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dummyUser),
    });

    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should get all users with GET /api/users", async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("should unathorize if get users without token", async () => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
    });

    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should get a user by id with GET /api/users/:id", async () => {
    const users = await UserModel.findAll();
    const id = users[0].id;
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if get user without token", async () => {
    const users = await UserModel.findAll();
    const id = users[0].id;
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "GET",
    });

    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should delete a user by id with DELETE /api/users/:id", async () => {
    const users = await UserModel.findAll();
    const id = users[0].id;
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toEqual("User deleted successfully");
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if delete user without token", async () => {
    const users = await UserModel.findAll();
    let id = 1;
    if (users.length > 0) {
      id = users[0].id;
    }
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });
});
