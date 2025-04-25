/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentVO } from './CommentVO';
import type { OrderItem } from './OrderItem';
export type PageCommentVO = {
    records?: Array<CommentVO>;
    total?: number;
    size?: number;
    current?: number;
    orders?: Array<OrderItem>;
    optimizeCountSql?: PageCommentVO;
    searchCount?: PageCommentVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
};

