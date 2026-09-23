import type { Session } from "../types";

export interface AuthService {
  login(email: string, password: string): Promise<Session | null>;
  logout(): Promise<void>;
  getSession(): Promise<Session | null>;
  /** Create a guest session tied to an email */
  createGuestSession(email: string, name: string): Promise<Session>;
}
