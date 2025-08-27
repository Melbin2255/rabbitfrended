// route.ts
import { NextResponse } from "next/server";
import type { RedditResponse, RedditChild } from "@/types/reddit";

export async function GET() {
  try {
    const res = await fetch("https://www.reddit.com/r/reactjs.json");
    if (!res.ok) {
      throw new Error(`Failed to fetch posts from Reddit: ${res.status} ${res.statusText}`);
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
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch posts from Reddit" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
