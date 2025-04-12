/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type {UserVO} from '../../generated/models/UserVO';

export type CommentVO = {
    commentableId?: number;
    content?: string;
    createTime?: string;
    downvoteCount?: number;
    id?: number;
    replies?: Array<CommentVO>;
    replyUserId?: number;
    replyUserVO?: UserVO;
    targetId?: number;
    updateTime?: string;
    upvoteCount?: number;
    isShowReplyBtn?: boolean; // 外加属性
    replyContent?: string; // 外加属性
    userId?: number;
    userVO?: UserVO;
};

