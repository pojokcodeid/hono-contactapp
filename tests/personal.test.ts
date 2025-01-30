import { expect, it, describe, beforeAll, afterAll } from "bun:test";
import prisma from "../src/utils/prismaClient";
import { Personal } from "@prisma/client";
const BASE_URL = "http://localhost:3000/api";
let token = "";

const userDummy = {
  name: "John Doe",
  email: "john@example.com",
  password: "StrongPassword@123",
  confirmPassword: "StrongPassword@123",
};

const personal = {
  id: 1,
  name: "Test Personal",
  userId: 1,
} as Personal;

beforeAll(async () => {
  await prisma.$connect();
  await prisma.personal.deleteMany();
  await prisma.user.deleteMany();
  // insert new user
  const user = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDummy),
  });
  const body = await user.json();
  personal.userId = body.data.id;
  // get token from login user
  const responseLogin = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userDummy.email,
      password: userDummy.password,
    }),
  });
  const userLogin = await responseLogin.json();
  token = userLogin.data.token;
});

afterAll(async () => {
  await prisma.personal.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

describe("REST API PERSONAL", () => {
  it("should create a personal entry", async () => {
    const response = await fetch(`${BASE_URL}/personal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(personal),
    });
    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body.message).toEqual("Personal created successfully");
    expect(body.data).toHaveProperty("id");
    personal.id = body.data.id;
  });

  it("should unathorize if create personal without token", async () => {
    const response = await fetch(`${BASE_URL}/personal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personal),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should error 400 if name is empty", async () => {
    personal.name = "";
    const response = await fetch(`${BASE_URL}/personal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(personal),
    });
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.message).toEqual("Name is required");
    expect(body.data).toBeNull();
    personal.name = "Test Personal";
  });

  it("should update personal with PUT /api/personal/:id", async () => {
    const response = await fetch(`${BASE_URL}/personal/${personal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(personal),
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toEqual("Personal updated successfully");
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if update personal without token", async () => {
    const response = await fetch(`${BASE_URL}/personal/${personal.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personal),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should error 400 if name is empty", async () => {
    personal.name = "";
    const response = await fetch(`${BASE_URL}/personal/${personal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(personal),
    });
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.message).toEqual("Name is required");
    expect(body.data).toBeNull();
    personal.name = "Test Personal";
  });

  it("should get personal by id with GET /api/personal/:id", async () => {
    const response = await fetch(`${BASE_URL}/personal/${personal.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if get personal without token", async () => {
    const response = await fetch(`${BASE_URL}/personal/${personal.id}`, {
      method: "GET",
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should get personal by id with id not found", async () => {
    const response = await fetch(`${BASE_URL}/personal/0`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    expect(response.status).toBe(404);
    expect(body.message).toEqual("Personal not found");
  });

  it("should get all personals with GET /api/personal", async () => {
    const response = await fetch(`${BASE_URL}/personal`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

  it("should unathorize if get personals without token", async () => {
    const response = await fetch(`${BASE_URL}/personal`, {
      method: "GET",
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should delete personal by id with DELETE /api/personal/:id", async () => {
    const response = await fetch(`${BASE_URL}/personal/${personal.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toEqual("Personal deleted successfully");
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if delete personal without token", async () => {
    const response = await fetch(`${BASE_URL}/personal/${personal.id}`, {
      method: "DELETE",
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should delete personal by id with id not found", async () => {
    const response = await fetch(`${BASE_URL}/personal/0`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    expect(response.status).toBe(404);
    expect(body.message).toEqual("Personal not found");
  });
});
