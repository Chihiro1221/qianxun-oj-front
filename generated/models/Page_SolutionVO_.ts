/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from '../../generated/models/OrderItem';
import type { SolutionVO } from '../../generated/models/SolutionVO';
export type Page_SolutionVO_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<SolutionVO>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
