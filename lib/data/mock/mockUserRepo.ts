import type { UserRepository } from "../repositories/UserRepository";
import type { SafeUser, User } from "../types";
import { getDB, saveDB } from "./persist";
import { generateId } from "@/lib/utils";

function toSafeUser(user: User): SafeUser {
  const { passwordHash: _, ...safe } = user;
  return safe;
}

export class MockUserRepository implements UserRepository {
  async getUserById(id: string): Promise<SafeUser | null> {
    const db = getDB();
    const user = db.users.find((u) => u.id === id);
    return user ? toSafeUser(user) : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const db = getDB();
    return db.users.find((u) => u.email === email) || null;
  }

  async getAllUsers(): Promise<SafeUser[]> {
    const db = getDB();
    return db.users.map(toSafeUser);
  }

  async createUser(input: {
    email: string;
    name: string;
    password: string;
    role?: "admin" | "customer";
  }): Promise<SafeUser> {
    const db = getDB();
    const user: User = {
      id: `user-${generateId().slice(0, 8)}`,
      email: input.email,
      name: input.name,
      passwordHash: input.password, // Mock — plain text
      role: input.role || "customer",
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    saveDB(db);
    return toSafeUser(user);
  }

  async getOrderCountByUserId(userId: string): Promise<number> {
    const db = getDB();
    return db.orders.filter((o) => o.userId === userId).length;
  }
}
