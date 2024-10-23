import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const searchText = searchParams.get("q");

  if (!searchText) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }
  try {
    const url = new URL(process.env.MAPBOX_BASE_URL as string);
    url.searchParams.set("q", searchText);
    url.searchParams.set("language", "en");
    url.searchParams.set("limit", "10");
    url.searchParams.set(
      "session_token",
      process.env.MAPBOX_SESSION_TOKEN as string
    );
    url.searchParams.set(
      "access_token",
      process.env.MAPBOX_PUBLIC_ACCESS_TOKEN as string
    );

    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Mapbox API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching from Mapbox:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Mapbox" },
      { status: 500 }
    );
  }
}
