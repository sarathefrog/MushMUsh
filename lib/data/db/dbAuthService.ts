import type { AuthService } from "../repositories/AuthService";
import type { Session } from "../types";

const NOT_IMPL = "Not implemented — see lib/data/db/README.md";

export class DbAuthService implements AuthService {
  async login(_email: string, _password: string): Promise<Session | null> { throw new Error(NOT_IMPL); }
  async logout(): Promise<void> { throw new Error(NOT_IMPL); }
  async getSession(): Promise<Session | null> { throw new Error(NOT_IMPL); }
  async createGuestSession(_email: string, _name: string): Promise<Session> { throw new Error(NOT_IMPL); }
}
