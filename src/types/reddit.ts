// src/types/reddit.ts
export interface RedditChild {
  data: {
    id: string;
    title: string;
    selftext: string;
    url: string;
    score: number;
    author: string;
    link_flair_text?: string;
  };
}

export interface RedditResponse {
  data: {
    children: RedditChild[];
  };
}
