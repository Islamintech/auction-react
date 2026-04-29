import { PostStatus, PostType } from '../enums/post.enum';

export interface Post {
    _id: string;
    memberId: string;
    postTitle: string;
    postBody: string;
    postType: PostType;
    postStatus: PostStatus;
    postImage?: string;
    postViewCount: number;
    postLikeCount: number;
    postCommentCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface PostInput {
    memberId?: string;
    postTitle: string;
    postBody: string;
    postType: PostType;
    postStatus?: PostStatus;
    postImage?: string;
}

export interface PostUpdateInput {
    _id: string;
    postTitle?: string;
    postBody?: string;
    postType?: PostType;
    postStatus?: PostStatus;
    postImage?: string;
}

export interface PostInquiry {
    order: string;
    page: number;
    limit: number;
    postType?: PostType;
    search?: string;
}
