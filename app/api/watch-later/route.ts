// Watch Later API
// File: app/api/watch-later/route.ts
import { auth } from "@/auth";
import { fetchWatchLater } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const page = parseInt(params.get("page") || "1", 10);

  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
  }

  const auth = req.auth;
  if (!auth) {
    return NextResponse.json(
      { error: "Unauthorized - Not logged in" },
      { status: 401 }
    );
  }

  const { email } = auth.user;

  try {
    const watchLater = await fetchWatchLater(page, email);
    return NextResponse.json({ watchLater });
  } catch (error) {
    console.error("Error fetching watch later list:", error);
    return NextResponse.json(
      { error: "Failed to fetch watch later list" },
      { status: 500 }
    );
  }
});
