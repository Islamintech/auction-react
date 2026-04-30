import React from "react";
import CarPlaceholder from "../landingPage/CarPlaceholder";
import { Post } from "../../../lib/types/post";

interface Props {
  post: Post;
  onOpen: (post: Post) => void;
  variant?: "card" | "row" | "feature";
}

export default function PostCard({ post, onOpen, variant = "card" }: Props) {
  if (variant === "row") {
    return (
      <div className="news-row" onClick={() => onOpen(post)}>
        <CarPlaceholder label={post.category} tone={post.image} height={92} />
        <div className="news-row__body">
          <div className="news-row__tag">{post.category}</div>
          <div className="news-row__title">{post.title}</div>
          <div className="news-row__meta">
            <span>{post.author.toUpperCase()}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.replies} replies</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "feature") {
    return (
      <div className="news-feature" onClick={() => onOpen(post)}>
        <CarPlaceholder label={post.category} tone={post.image} height={320} />
        <div className="news-feature__body">
          <div className="news-feature__tag">FEATURED · {post.category}</div>
          <div className="news-feature__title">{post.title}</div>
          <div className="news-feature__excerpt">{post.excerpt}</div>
          <div className="news-feature__meta">
            <span>{post.author.toUpperCase()}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.replies} replies</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-card" onClick={() => onOpen(post)}>
      <CarPlaceholder label={post.category} tone={post.image} height={150} />
      <div className="news-card__body">
        <div className="news-card__tag">{post.category}</div>
        <div className="news-card__title">{post.title}</div>
        <div className="news-card__excerpt">{post.excerpt}</div>
        <div className="news-card__meta">
          <span>{post.author.toUpperCase()} · {post.date}</span>
          <span>{post.replies} replies</span>
        </div>
      </div>
    </div>
  );
}
