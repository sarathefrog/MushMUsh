import { getAuthService } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST() {
  const auth = getAuthService();
  await auth.logout();
  return NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}
