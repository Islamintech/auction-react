export type PostCategory =
  | "BUYER STORY"
  | "GUIDE"
  | "Q&A"
  | "INSPECTION"
  | "ANNOUNCEMENT"
  | "MARKET";

export interface Post {
  id: string;
  category: PostCategory;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  date: string;
  replies: number;
  image: string;
  featured?: boolean;
}
