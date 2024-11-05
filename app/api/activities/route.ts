// Activities API
// File: app/api/activities/route.ts
import { auth } from "@/auth";
import { fetchActivities } from "@/lib/data";
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
    const activities = await fetchActivities(page, email);
    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 }
    );
  }
});
