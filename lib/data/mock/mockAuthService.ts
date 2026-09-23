import { cookies } from "next/headers";
import type { AuthService } from "../repositories/AuthService";
import type { Session } from "../types";
import { getDB, saveDB } from "./persist";
import { generateId } from "@/lib/utils";

const SESSION_COOKIE = "mush_session";

export class MockAuthService implements AuthService {
  async login(email: string, password: string): Promise<Session | null> {
    const db = getDB();
    const user = db.users.find(
      (u) => u.email === email && u.passwordHash === password
    );
    if (!user) return null;

    const session: Session = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    // Store session in cookie (JSON-encoded)
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return session;
  }

  async logout(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
  }

  async getSession(): Promise<Session | null> {
    const cookieStore = await cookies();
    const raw = cookieStore.get(SESSION_COOKIE)?.value;
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Session;
    } catch {
      return null;
    }
  }

  async createGuestSession(email: string, name: string): Promise<Session> {
    // Create a temporary user
    const db = getDB();
    const guestUser = {
      id: `guest-${generateId().slice(0, 8)}`,
      email,
      name,
      passwordHash: "",
      role: "customer" as const,
      createdAt: new Date().toISOString(),
    };
    db.users.push(guestUser);
    saveDB(db);

    const session: Session = {
      userId: guestUser.id,
      email: guestUser.email,
      name: guestUser.name,
      role: guestUser.role,
    };

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: "lax",
    });

    return session;
  }
}
