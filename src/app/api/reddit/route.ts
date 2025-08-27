// route.ts
import { NextResponse } from "next/server";
import type { RedditResponse, RedditChild } from "@/types/reddit";

export async function GET() {
  try {
    const res = await fetch("https://www.reddit.com/r/reactjs.json", {
      headers: {
        "User-Agent": "web:react-feed-viewer:1.0.0 (by u/Careless_Explorer899)",
        "Accept": "application/json"
      },
      cache: "no-store"
    });

    if (!res.ok) {
      // Log what Reddit sent back
      const text = await res.text();
      console.error("Reddit error:", res.status, text);
      return new NextResponse(
        JSON.stringify({ error: "Reddit API failed", status: res.status }),
        { status: 500 }
      );
    }

    const data: RedditResponse = await res.json();

    const posts = data.data.children.map((child: RedditChild) => ({
      id: child.data.id,
      title: child.data.title,
      selftext: child.data.selftext,
      url: child.data.url,
      score: child.data.score,
      author: child.data.author,
      link_flair_text: child.data.link_flair_text,
    }));

    return NextResponse.json(posts);
  } catch (err) {
    console.error("Server error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}