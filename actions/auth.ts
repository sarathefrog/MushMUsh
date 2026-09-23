"use server";

import { getAuthService, getUserRepo } from "@/lib/data";
import type { Session } from "@/lib/data/types";

export async function loginAction(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: Session }> {
  const auth = getAuthService();
  const session = await auth.login(email, password);
  if (!session) {
    return { success: false, error: "Invalid email or password." };
  }
  return { success: true, session };
}

export async function logoutAction(): Promise<void> {
  const auth = getAuthService();
  await auth.logout();
}

export async function getSessionAction(): Promise<Session | null> {
  const auth = getAuthService();
  return auth.getSession();
}

export async function signupAction(
  email: string,
  name: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: Session }> {
  const userRepo = getUserRepo();
  const auth = getAuthService();

  // Check if user already exists
  const existing = await userRepo.getUserByEmail(email);
  if (existing) {
    return { success: false, error: "Email already registered." };
  }

  // Create user
  await userRepo.createUser({ email, name, password });

  // Log them in
  const session = await auth.login(email, password);
  if (!session) {
    return { success: false, error: "Account created but login failed." };
  }
  return { success: true, session };
}

export async function guestCheckoutAction(
  email: string,
  name: string
): Promise<{ success: boolean; session?: Session }> {
  const auth = getAuthService();
  const session = await auth.createGuestSession(email, name);
  return { success: true, session };
}
