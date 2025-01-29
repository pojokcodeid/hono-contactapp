import { User } from "@prisma/client";

export interface IUserModel {
  create(user: User): Promise<User>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  verifyUser(email: string, password: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
}
