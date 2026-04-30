import React from "react";
import { useHistory, useParams } from "react-router-dom";
import CarPlaceholder from "../landingPage/CarPlaceholder";
import PostCard from "../newsPage/PostCard";
import { POSTS } from "../../../lib/data/posts";
import { Post } from "../../../lib/types/post";
import "../../../css/news.css";

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const post = POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="news-detail">
        <div className="news-detail__missing">
          Post not found.
          <button className="news-detail__back" onClick={() => history.push("/news")}>
            ← Back to news
          </button>
        </div>
      </div>
    );
  }

  const related = POSTS.filter(
    (p) => p.id !== post.id && p.category === post.category
  ).slice(0, 3);

  return (
    <div className="news-detail">
      <div className="news-detail__crumb">
        <button className="news-detail__back" onClick={() => history.push("/news")}>
          ← All posts
        </button>
        <span>COMMUNITY / {post.category}</span>
      </div>

      <h1 className="news-detail__title">{post.title}</h1>
      <div className="news-detail__meta">
        <span>{post.author.toUpperCase()}</span>
        <span>·</span>
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.replies} replies</span>
      </div>

      <div className="news-detail__hero">
        <CarPlaceholder label={post.category} tone={post.image} height={360} />
      </div>

      <div className="news-detail__excerpt">{post.excerpt}</div>

      <article className="news-detail__body">
        {post.body.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>

      {related.length > 0 && (
        <div className="news-detail__related">
          <div className="news-detail__related-head">More in {post.category}</div>
          <div className="news__grid">
            {related.map((p: Post) => (
              <PostCard
                key={p.id}
                post={p}
                onOpen={(rp) => history.push(`/news/${rp.id}`)}
                variant="card"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
