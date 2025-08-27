export interface RedditResponse {
  data: {
    children: RedditChild[];
  };
}

export interface RedditChild {
  data: {
    id: string;
    title: string;
    selftext: string;
    url: string;
    score: number;
    author: string;
    link_flair_text: string;
  };
}