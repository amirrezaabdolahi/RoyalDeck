import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { tag } = params;

  try {
    // ✅ decode the tag
    const decodedTag = decodeURIComponent(tag);

    const res = await fetch(`https://api.clashroyale.com/v1/players/${decodedTag}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_KEY}`,
      }
    });

    if (!res.ok) {
      console.error("Clash API Error:", res.status, res.statusText);
      return NextResponse.json(
        { error: "Player not found or API error" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
