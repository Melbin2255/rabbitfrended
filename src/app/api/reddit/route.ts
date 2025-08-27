// route.ts
import { NextResponse } from "next/server";
import type { RedditResponse, RedditChild } from "@/types/reddit";

export async function GET() {
  const res = await fetch("https://www.reddit.com/r/reactjs.json");
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
}
