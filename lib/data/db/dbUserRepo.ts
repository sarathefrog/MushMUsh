import type { UserRepository } from "../repositories/UserRepository";
import type { SafeUser, User } from "../types";

const NOT_IMPL = "Not implemented — see lib/data/db/README.md";

export class DbUserRepository implements UserRepository {
  async getUserById(_id: string): Promise<SafeUser | null> { throw new Error(NOT_IMPL); }
  async getUserByEmail(_email: string): Promise<User | null> { throw new Error(NOT_IMPL); }
  async getAllUsers(): Promise<SafeUser[]> { throw new Error(NOT_IMPL); }
  async createUser(_input: { email: string; name: string; password: string; role?: "admin" | "customer" }): Promise<SafeUser> { throw new Error(NOT_IMPL); }
  async getOrderCountByUserId(_userId: string): Promise<number> { throw new Error(NOT_IMPL); }
}
