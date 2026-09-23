import type { SafeUser, User } from "../types";

export interface UserRepository {
  getUserById(id: string): Promise<SafeUser | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getAllUsers(): Promise<SafeUser[]>;
  createUser(input: {
    email: string;
    name: string;
    password: string;
    role?: "admin" | "customer";
  }): Promise<SafeUser>;
  /** Returns count of orders for a given user */
  getOrderCountByUserId(userId: string): Promise<number>;
}
