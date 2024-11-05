// Add/Remove Favorites
// File: app/api/favorites/[id]/route.ts
import { auth } from "@/auth";
import { favoriteExists, insertFavorite, deleteFavorite } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const POST = auth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    const auth = req.auth;
    if (!auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const { email } = auth.user;

    const exists = await favoriteExists(id, email);
    if (exists) {
      return NextResponse.json({ message: "Already favorited" });
    }

    try {
      await insertFavorite(id, email);
      return NextResponse.json({ message: "Favorite Added" });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      return NextResponse.json(
        { error: "Failed to add to favorites" },
        { status: 500 }
      );
    }
  }
);

export const DELETE = auth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;

    const auth = req.auth;
    if (!auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const { email } = auth.user;

    try {
      await deleteFavorite(id, email);
      return NextResponse.json({ message: "Favorite removed" });
    } catch (error) {
      console.error("Error removing from favorites:", error);
      return NextResponse.json(
        { error: "Failed to remove from favorites" },
        { status: 500 }
      );
    }
  }
);
