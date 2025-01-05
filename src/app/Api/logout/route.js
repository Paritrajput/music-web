import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("token", "", { maxAge: 0, httpOnly: true });
  return response;
}
