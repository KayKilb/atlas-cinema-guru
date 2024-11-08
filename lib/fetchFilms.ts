import { getSession } from "next-auth/react";

export async function fetchFilms(
  page = 1,
  query = "",
  genres = [],
  minYear = 1900,
  maxYear = new Date().getFullYear()
) {
  try {
    // Retrieve the current user session
    const session = await getSession();
    if (!session) {
      throw new Error("User not authenticated");
    }

    // Construct the API URL with query parameters
    const url = new URL("/api/titles", window.location.origin);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("query", query);
    if (minYear) url.searchParams.set("minYear", minYear.toString());
    if (maxYear) url.searchParams.set("maxYear", maxYear.toString());
    if (genres.length > 0) url.searchParams.set("genres", genres.join(","));

    // Make the API request with the session token if needed
    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`, // Include token if needed
      },
    });

    // Check if the response is in JSON format
    if (response.headers.get("content-type")?.includes("application/json")) {
      const data = await response.json();
      return data;
    } else {
      console.error("Expected JSON but received HTML:", await response.text());
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error fetching films:", error);
    throw error;
  }
}
