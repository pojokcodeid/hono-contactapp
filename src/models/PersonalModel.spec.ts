import { Personal } from "@prisma/client";
import { expect, it, describe, beforeAll, afterAll } from "bun:test";
import PerssonalModel from "./PerssonalModel";
import prisma from "../utils/prismaClient";

// Mock data
const personal = {
  id: 1,
  name: "Test Personal",
  userId: 1,
} as Personal;

describe("PerssonalModel Tests", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
    await prisma.personal.deleteMany();
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password: "password",
      },
    });
    personal.userId = user.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a personal entry", async () => {
    const createdPersonal = await PerssonalModel.create(personal);
    expect(createdPersonal).toHaveProperty("id");
    expect(createdPersonal.name).toBe(personal.name);
  });

  it("should update a personal entry", async () => {
    const updatedPersonal = await PerssonalModel.update(personal.id, {
      ...personal,
      name: "Updated Personal",
    });
    expect(updatedPersonal.name).toBe("Updated Personal");
  });

  it("should find a personal entry by id", async () => {
    const foundPersonal = await PerssonalModel.findById(personal.id);
    expect(foundPersonal).toHaveProperty("id", personal.id);
  });

  it("should find all personal entries", async () => {
    const foundPersonals = await PerssonalModel.findAll();
    expect(foundPersonals).toBeInstanceOf(Array);
    expect(foundPersonals.length).toBeGreaterThan(0);
    expect(foundPersonals[0]).toHaveProperty("id");
  });

  it("should delete a personal entry", async () => {
    const deletedPersonal = await PerssonalModel.delete(personal.id);
    expect(deletedPersonal).toHaveProperty("id", personal.id);
  });
});
