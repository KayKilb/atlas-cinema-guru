// Add/Remove Favorites
// File: app/api/favorites/route.ts

import { fetchFavorites } from "@/lib/data";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const email = /* retrieve user email from session */;

  try {
    const favorites = await fetchFavorites(email);
    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
};
