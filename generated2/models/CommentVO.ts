/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserVO } from './UserVO';
export type CommentVO = {
    id?: number;
    content?: string;
    upvoteCount?: number;
    downvoteCount?: number;
    userId?: number;
    userVO?: UserVO;
    commentableId?: number;
    targetId?: number;
    replyUserId?: number;
    replyUserVO?: UserVO;
    createTime?: string;
    updateTime?: string;
};

