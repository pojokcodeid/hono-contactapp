import { User } from "@prisma/client";
import { IUserModel } from "./interfaces/IUserModel";
import prisma from "../utils/prismaClient";

class UserModel implements IUserModel {
  constructor() {}

  /**
   * function to hash password
   * @param password password of user
   * @returns hashed password
   */
  private hashPassword = async (password: string): Promise<string> =>
    Bun.password.hash(password, { algorithm: "bcrypt", cost: 10 });

  /**
   * function to compare password
   * @param password password of user
   * @param hashedPassword hashed password of user
   * @returns boolean
   */
  private comparePassword = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => Bun.password.verify(password, hashedPassword);

  async create(user: User): Promise<User> {
    await this.findByEmail(user.email).then((user) => {
      if (user) {
        throw new Error("Email already exists");
      }
    });
    user.password = await this.hashPassword(user.password);
    return await prisma.user.create({ data: user }).then((user) => {
      user.password = "********";
      return user;
    });
  }

  /**
   * Updates an existing user record in the database.
   *
   * @param id - The user record ID to be updated.
   * @param user - The updated user object containing details to be saved.
   * @returns A promise that resolves to the updated user.
   * @throws {Error} If the user is not found.
   * @throws {Error} If the email already exists.
   */
  async update(id: number, user: User): Promise<User> {
    if (user.password && user.password.length > 0) {
      user.password = await this.hashPassword(user.password);
    }
    return await prisma.user
      .update({
        where: { id },
        data: {
          name: user.name || undefined,
          email: user.email || undefined,
          password: user.password || undefined,
        },
      })
      .then((user) => {
        user.password = "********";
        return user;
      });
  }

  /**
   * Deletes an existing user record from the database.
   *
   * @param id - The user record ID to be deleted.
   * @returns A promise that resolves to the deleted user.
   * @throws {Error} If the user is not found.
   */
  async delete(id: number): Promise<User> {
    return await prisma.user.delete({ where: { id } }).then((user) => {
      user.password = "********";
      return user;
    });
  }

  /**
   * Finds a user by their email address.
   *
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the user object if found, otherwise null.
   */
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } }).then((user) => {
      if (user) {
        user.password = "********";
      }
      return user;
    });
  }

  /**
   * Retrieves all user records from the database.
   *
   * @returns A promise that resolves to an array of user objects with their passwords hidden.
   */
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany().then((users) => {
      return users.map((user) => {
        user.password = "********";
        return user;
      });
    });
  }

  /**
   * Verifies a user's credentials by checking if the provided email and password match an existing user.
   *
   * @param email - The email address of the user to verify.
   * @param password - The password to verify against the stored hashed password for the user.
   * @returns A promise that resolves to the user object with the password hidden if verification is successful, otherwise null.
   */
  async verifyUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (user && (await this.comparePassword(password, user.password))) {
      user.password = "********";
      return user;
    }
    return null;
  }
}

export default new UserModel();
