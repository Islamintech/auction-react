import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import PostCard from "./PostCard";
import { POSTS } from "../../../lib/data/posts";
import { Post, PostCategory } from "../../../lib/types/post";
import "../../../css/news.css";

const CATEGORIES: ("ALL" | PostCategory)[] = [
  "ALL",
  "BUYER STORY",
  "GUIDE",
  "Q&A",
  "INSPECTION",
  "ANNOUNCEMENT",
  "MARKET",
];

export default function NewsPage() {
  const history = useHistory();
  const [active, setActive] = useState<"ALL" | PostCategory>("ALL");
  const [query, setQuery] = useState("");

  const featured = useMemo(() => POSTS.find((p) => p.featured) ?? POSTS[0], []);

  const filtered = useMemo(() => {
    return POSTS.filter((p) => p.id !== featured.id)
      .filter((p) => (active === "ALL" ? true : p.category === active))
      .filter((p) =>
        query.trim()
          ? (p.title + " " + p.excerpt + " " + p.author)
              .toLowerCase()
              .includes(query.trim().toLowerCase())
          : true
      );
  }, [active, query, featured.id]);

  const open = (p: Post) => history.push(`/news/${p.id}`);

  return (
    <div className="news">
      <div className="news__head">
        <div className="news__crumb">COMMUNITY / NEWS &amp; STORIES</div>
        <div className="news__head-row">
          <h1 className="news__title">From the community</h1>
          <input
            className="news__search"
            placeholder="Search posts, authors…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="news__cats">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`news__cat${active === c ? " news__cat--active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {active === "ALL" && !query && (
        <PostCard post={featured} onOpen={open} variant="feature" />
      )}

      <div className="news__grid">
        {filtered.map((p) => (
          <PostCard key={p.id} post={p} onOpen={open} variant="card" />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="news__empty">No posts match those filters.</div>
      )}
    </div>
  );
}
