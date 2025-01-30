import { Address, Personal, PrismaClient, User } from "@prisma/client";
import { expect, it, describe, beforeAll, afterAll } from "bun:test";
import UserModel from "./UserModel";
import AddressModel from "./AddressModel";
import PerssonalModel from "./PerssonalModel";

describe("AddressModel Tests", () => {
  let prisma: PrismaClient;

  const user = {
    id: 1,
    name: "Test User",
    email: "test@example.com",
    password: "password",
  } as User;

  const personal = {
    id: 1,
    name: "Test Personal",
    userId: 1,
  } as Personal;

  let address = {
    id: 1,
    addressName: "Test Address",
    address: "Jalan Test",
    city: "Test City",
    province: "Test Province",
    country: "Test Country",
    personalId: 1,
  } as Address;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.address.deleteMany(); // Clear addresses before tests
    await prisma.personal.deleteMany();
    await prisma.user.deleteMany(); // Clear users before tests
    const createdUser = await UserModel.create(user);
    personal.userId = createdUser.id;
    const createdPersonal = await PerssonalModel.create(personal);
    address.personalId = createdPersonal.id;
  });

  afterAll(async () => {
    await prisma.address.deleteMany(); // Clear addresses after tests
    await prisma.personal.deleteMany();
    await prisma.user.deleteMany(); // Clear users after tests
    await prisma.$disconnect();
  });

  it("should create an address", async () => {
    const createdAddress = await AddressModel.create(address);
    expect(createdAddress).toHaveProperty("id");
    expect(createdAddress.addressName).toBe(address.addressName);
  });

  it("should update an address", async () => {
    const addresExits = await AddressModel.findAll();
    address = addresExits[0];
    address.addressName = "Updated Test Address";
    const updatedAddress = await AddressModel.update(address.id, address);
    expect(updatedAddress).toHaveProperty("id");
    expect(updatedAddress.addressName).toBe(address.addressName);
  });

  it("should find an address by id", async () => {
    const addresExits = await AddressModel.findAll();
    address = addresExits[0];
    const foundAddress = await AddressModel.findById(address.id);
    expect(foundAddress).toHaveProperty("id");
    expect(foundAddress?.addressName).toBe(address.addressName);
  });

  it("should find all addresses", async () => {
    const foundAddresses = await AddressModel.findAll();
    expect(foundAddresses).toBeInstanceOf(Array);
    expect(foundAddresses.length).toBeGreaterThan(0);
    expect(foundAddresses[0]).toHaveProperty("id");
  });

  it("should delete an address", async () => {
    const addresExits = await AddressModel.findAll();
    const deletedAddress = await AddressModel.delete(addresExits[0].id);
    expect(deletedAddress).toHaveProperty("id");
    expect(addresExits[0].id).toBe(deletedAddress.id);
  });
});
