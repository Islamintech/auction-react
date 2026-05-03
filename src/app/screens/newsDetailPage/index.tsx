import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CarPlaceholder from "../landingPage/CarPlaceholder";
import PostCard from "../newsPage/PostCard";
import { Post } from "../../../lib/types/post";
import PostService from "../../services/PostService";
import { serverApi } from "../../../lib/config";
import "../../../css/news.css";

function imgUrl(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${serverApi}/${path}`;
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const service = new PostService();
    setLoading(true);
    setNotFound(false);
    service
      .getById(id)
      .then((data) => setPost(data))
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      })
      .finally(() => setLoading(false));

    service
      .getAll({ page: 1, limit: 20 })
      .then((data) => setRelated(data.filter((p) => p._id !== id).slice(0, 3)))
      .catch((err) => console.log(err));
  }, [id]);

  if (loading) {
    return <div className="news-detail"><div className="news-detail__missing">Loading…</div></div>;
  }

  if (notFound || !post) {
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

  const image = post.postImage ? imgUrl(post.postImage) : "";
  const date = post.createdAt ? post.createdAt.slice(0, 10) : "";

  return (
    <div className="news-detail">
      <div className="news-detail__crumb">
        <button className="news-detail__back" onClick={() => history.push("/news")}>
          ← All posts
        </button>
        <span>COMMUNITY / {post.postType.replace("_", " ")}</span>
      </div>

      <h1 className="news-detail__title">{post.postTitle}</h1>
      <div className="news-detail__meta">
        <span>{date}</span>
        <span>·</span>
        <span>{post.postCommentCount} replies</span>
        <span>·</span>
        <span>{post.postViewCount} views</span>
        <span>·</span>
        <span>{post.postLikeCount} likes</span>
      </div>

      <div className="news-detail__hero">
        {image ? (
          <div style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", height: 360, borderRadius: 12 }} />
        ) : (
          <CarPlaceholder label={post.postType.replace("_", " ")} tone={post.postType.replace("_", " ")} height={360} />
        )}
      </div>

      <article className="news-detail__body">
        {post.postBody.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </article>

      {related.length > 0 && (
        <div className="news-detail__related">
          <div className="news-detail__related-head">More posts</div>
          <div className="news__grid">
            {related.map((p) => (
              <PostCard
                key={p._id}
                post={p}
                onOpen={(rp) => history.push(`/news/${rp._id}`)}
                variant="card"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
