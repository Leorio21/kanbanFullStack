import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  if (req.auth && req.cookies) {
    return NextResponse.next();
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
});

export const config = {
  matcher: ["/api/board"],
};
