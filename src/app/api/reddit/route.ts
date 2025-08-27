import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // Fetch Reddit data
    const res = await axios.get("https://www.reddit.com/r/reactjs.json");

    // Extract children array
    const children = res.data?.data?.children || [];

    // Map only the required fields
    const posts = children.map((item: any) => ({
      id: item.data.id,
      title: item.data.title,
      selftext: item.data.selftext_html ? item.data.selftext : "", // text only
      url: item.data.url,
      score: item.data.score,
      link_flair_text: item.data.link_flair_text || null,
      author: item.data.author,
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Reddit API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Reddit posts" },
      { status: 500 }
    );
  }
}
