// Titles API
// File: app/api/titles/route.ts
import { fetchGenres, fetchTitles } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;
  const page = parseInt(params.get("page") || "1", 10);
  const minYear = params.get("minYear")
    ? Number(params.get("minYear"))
    : undefined;
  const maxYear = params.get("maxYear")
    ? Number(params.get("maxYear"))
    : undefined;
  const genres = params.get("genres")
    ? params.get("genres")?.split(",")
    : await fetchGenres();

  if (isNaN(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page number" }, { status: 400 });
  }

  try {
    const titles = await fetchTitles(page, minYear, maxYear, genres);
    return NextResponse.json({ titles });
  } catch (error) {
    console.error("Error fetching titles:", error);
    return NextResponse.json(
      { error: "Failed to fetch titles" },
      { status: 500 }
    );
  }
};
