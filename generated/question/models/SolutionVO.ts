/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionVO } from './QuestionVO';
import type { UserVO } from './UserVO';
export type SolutionVO = {
    id?: number;
    title?: string;
    content?: string;
    viewCount?: number;
    upvoteCount?: number;
    downvoteCount?: number;
    favoriteCount?: number;
    userId?: number;
    userVO?: UserVO;
    questionVO?: QuestionVO;
    questionId?: number;
    createTime?: string;
    updateTime?: string;
};

