import { describe, it, expect, afterAll, beforeAll } from "bun:test";
import prisma from "../src/utils/prismaClient";

const BASE_URL = "http://localhost:3000/api";
let token = "";
let insertedId = 0;
const userDummy = {
  name: "John Doe",
  email: "john@example.com",
  password: "StrongPassword@123",
  confirmPassword: "StrongPassword@123",
};

const addressDummy = {
  addressName: "Home",
  address: "123 Main St",
  city: "New York",
  province: "NY",
  country: "USA",
};

beforeAll(async () => {
  await prisma.$connect();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$executeRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE address AUTO_INCREMENT = 1`;
  // insert new user
  await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDummy),
  });
  // get token from login user
  const responseLogin = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userDummy.email,
      password: userDummy.password,
    }),
  });
  const user = await responseLogin.json();
  token = user.data.token;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("REST API ADDRESSES", () => {
  it("should create a new address with POST /api/address", async () => {
    const response = await fetch(`${BASE_URL}/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressDummy),
    });
    const body = await response.json();
    insertedId = body.data.id;
    expect(response.status).toBe(201);
    expect(body.message).toEqual("Address created successfully");
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if create address without token", async () => {
    const response = await fetch(`${BASE_URL}/address`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressDummy),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should error 400 if addressName is empty", async () => {
    addressDummy.addressName = "";
    const response = await fetch(`${BASE_URL}/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressDummy),
    });
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.message).toEqual("Address name is required");
  });

  it("should error 400 if update addressName is empty with PUT /api/address/:id", async () => {
    const response = await fetch(`${BASE_URL}/address/${insertedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressDummy),
    });
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.message).toEqual("Address name is required");
    expect(body.data).toBeNull();
  });

  it("should update address with PUT /api/address/:id", async () => {
    addressDummy.addressName = "Home";
    const response = await fetch(`${BASE_URL}/address/${insertedId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressDummy),
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toEqual("Address updated successfully");
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if update address without token", async () => {
    const response = await fetch(`${BASE_URL}/address/${insertedId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addressDummy),
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should get all address with GET /api/address", async () => {
    const response = await fetch(`${BASE_URL}/address`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it("shouls unathorize if get address without token", async () => {
    const response = await fetch(`${BASE_URL}/address`, {
      method: "GET",
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should get address by id with GET /api/address/:id", async () => {
    const response = await fetch(`${BASE_URL}/address/${insertedId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if get address by id without token", async () => {
    const response = await fetch(`${BASE_URL}/address/${insertedId}`, {
      method: "GET",
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });

  it("should delete address by id with DELETE /api/address/:id", async () => {
    const response = await fetch(`${BASE_URL}/address/${insertedId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.message).toEqual("Address deleted successfully");
    expect(body.data).toHaveProperty("id");
  });

  it("should unathorize if delete address by id without token", async () => {
    const response = await fetch(`${BASE_URL}/address/${insertedId}`, {
      method: "DELETE",
    });
    const body = await response.json();
    expect(response.status).toBe(401);
    expect(body.message).toEqual("Unauthorized");
  });
});
