/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from '../../generated/models/OrderItem';
import type { Solution } from '../../generated/models/Solution';
export type Page_Solution_ = {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  orders?: Array<OrderItem>;
  pages?: number;
  records?: Array<Solution>;
  searchCount?: boolean;
  size?: number;
  total?: number;
};
