import { Personal } from "@prisma/client";

export interface IPersonalModel {
  create(personal: Personal): Promise<Personal>;
  update(id: number, personal: Personal): Promise<Personal>;
  delete(id: number): Promise<Personal>;
  findById(id: number): Promise<Personal | null>;
  findByUserId(userId: number): Promise<Personal[]>;
  findAll(): Promise<Personal[]>;
}
