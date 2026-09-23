import { getAuthService } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
  const auth = getAuthService();
  const session = await auth.getSession();
  return NextResponse.json({ session });
}
