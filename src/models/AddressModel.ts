import { Address, PrismaClient } from "@prisma/client";
import { IAddressModel } from "./interfaces/IAddressModel";
import prisma from "../utils/prismaClient";

class AddressModel implements IAddressModel {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  /**
   * Creates a new address record in the database.
   *
   * @param address - The address object containing details to be saved.
   * @returns A promise that resolves to the newly created address.
   */
  create(address: Address): Promise<Address> {
    return this.prisma.address.create({ data: address });
  }

  /**
   * Updates an existing address record in the database.
   *
   * @param id - The address record ID to be updated.
   * @param address - The updated address object containing details to be saved.
   * @returns A promise that resolves to the updated address.
   */
  update(id: number, address: Address): Promise<Address> {
    return this.prisma.address.update({
      where: { id },
      data: {
        addressName: address.addressName || undefined,
        address: address.address || undefined,
        city: address.city || undefined,
        province: address.province || undefined,
        country: address.country || undefined,
        personalId: address.personalId || undefined,
      },
    });
  }

  /**
   * Deletes an existing address record from the database.
   *
   * @param id - The address record ID to be deleted.
   * @returns A promise that resolves to the deleted address.
   */
  delete(id: number): Promise<Address> {
    return this.prisma.address.delete({ where: { id } });
  }

  /**
   * Finds an address by its ID.
   *
   * @param id - The address record ID to find.
   * @returns A promise that resolves to the found address, or null if it does not exist.
   */
  findById(id: number): Promise<Address | null> {
    return this.prisma.address.findUnique({ where: { id } });
  }

  /**
   * Retrieves all address records from the database.
   *
   * @returns A promise that resolves to an array of addresses.
   */
  findAll(): Promise<Address[]> {
    return this.prisma.address.findMany();
  }
}

export default new AddressModel();
