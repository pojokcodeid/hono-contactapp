import { Personal, PrismaClient } from "@prisma/client";
import { IPersonalModel } from "./interfaces/IPersonalModel";
import prisma from "../utils/prismaClient";

class PerssonalModel implements IPersonalModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }
  findByUserId(userId: number): Promise<Personal[]> {
    return this.prisma.personal.findMany({ where: { userId } });
  }
  create(personal: Personal): Promise<Personal> {
    return this.prisma.personal.create({ data: personal });
  }
  update(id: number, personal: Personal): Promise<Personal> {
    return this.prisma.personal.update({ where: { id }, data: personal });
  }
  delete(id: number): Promise<Personal> {
    return this.prisma.personal.delete({ where: { id } });
  }
  findById(id: number): Promise<Personal | null> {
    return this.prisma.personal.findUnique({ where: { id } });
  }
  findAll(): Promise<Personal[]> {
    return this.prisma.personal.findMany();
  }
}

export default new PerssonalModel();
