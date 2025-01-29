import { Address } from "@prisma/client";

export interface IAddressModel {
  create(address: Address): Promise<Address>;
  update(id: number, address: Address): Promise<Address>;
  delete(id: number): Promise<Address>;
  findById(id: number): Promise<Address | null>;
  findAll(): Promise<Address[]>;
}
