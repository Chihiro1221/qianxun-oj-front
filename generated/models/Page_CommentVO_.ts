/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CommentVO } from '../../generated/models/CommentVO';
import type { OrderItem } from '../../generated/models/OrderItem';
export type Page_CommentVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<CommentVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

