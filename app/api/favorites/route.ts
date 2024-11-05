// Favorites API
// File: app/api/favorites/route.ts
import { auth } from "@/auth";
import { fetchFavorites } from "@/lib/data";
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
    const favorites = await fetchFavorites(page, email);
    return NextResponse.json({ favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
});
