import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import PostCard from "./PostCard";
import { Post, PostType } from "../../../lib/types/post";
import PostService from "../../services/PostService";
import "../../../css/news.css";

const CATEGORIES: ("ALL" | PostType)[] = ["ALL", "NEWS", "ARTICLE", "FREE_BOARD"];

const LABELS: Record<"ALL" | PostType, string> = {
  ALL: "ALL",
  NEWS: "NEWS",
  ARTICLE: "ARTICLE",
  FREE_BOARD: "FREE BOARD",
};

export default function NewsPage() {
  const history = useHistory();
  const [active, setActive] = useState<"ALL" | PostType>("ALL");
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const service = new PostService();
    service
      .getAll({ page: 1, limit: 50 })
      .then((data) => setPosts(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const featured = posts[0];

  const filtered = useMemo(() => {
    return posts
      .filter((p) => (featured ? p._id !== featured._id : true))
      .filter((p) => (active === "ALL" ? true : p.postType === active))
      .filter((p) =>
        query.trim()
          ? (p.postTitle + " " + p.postBody)
              .toLowerCase()
              .includes(query.trim().toLowerCase())
          : true
      );
  }, [active, query, posts, featured]);

  const open = (p: Post) => history.push(`/news/${p._id}`);

  return (
    <div className="news">
      <div className="news__head">
        <div className="news__crumb">COMMUNITY / NEWS &amp; STORIES</div>
        <div className="news__head-row">
          <h1 className="news__title">From the community</h1>
          <input
            className="news__search"
            placeholder="Search posts…"
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
              {LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      {loading && <div className="news__empty">Loading…</div>}

      {!loading && featured && active === "ALL" && !query && (
        <PostCard post={featured} onOpen={open} variant="feature" />
      )}

      <div className="news__grid">
        {filtered.map((p) => (
          <PostCard key={p._id} post={p} onOpen={open} variant="card" />
        ))}
      </div>

      {!loading && posts.length === 0 && (
        <div className="news__empty">No posts yet.</div>
      )}

      {!loading && posts.length > 0 && filtered.length === 0 && (
        <div className="news__empty">No posts match those filters.</div>
      )}
    </div>
  );
}
