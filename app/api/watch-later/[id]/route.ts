// Add/Remove Watch Later
// File: app/api/watch-later/[id]/route.ts
import { auth } from "@/auth";
import {
  watchLaterExists,
  insertWatchLater,
  deleteWatchLater,
} from "@/lib/data";
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

    const exists = await watchLaterExists(id, email);
    if (exists) {
      return NextResponse.json({ message: "Already added to Watch Later" });
    }

    try {
      await insertWatchLater(id, email);
      return NextResponse.json({ message: "Watch Later Added" });
    } catch (error) {
      console.error("Error adding to watch later:", error);
      return NextResponse.json(
        { error: "Failed to add to watch later" },
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
      await deleteWatchLater(id, email);
      return NextResponse.json({ message: "Watch Later removed" });
    } catch (error) {
      console.error("Error removing from watch later:", error);
      return NextResponse.json(
        { error: "Failed to remove from watch later" },
        { status: 500 }
      );
    }
  }
);
