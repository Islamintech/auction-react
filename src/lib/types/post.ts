export type PostType = "NEWS" | "ARTICLE" | "FREE_BOARD";

export interface Post {
  _id: string;
  memberId: string;
  postTitle: string;
  postImage: string;
  postBody: string;
  postType: PostType;
  postStatus: string;
  postViewCount: number;
  postLikeCount: number;
  postCommentCount: number;
  createdAt: string;
  updatedAt: string;
}
