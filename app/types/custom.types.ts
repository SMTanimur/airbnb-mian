import { QueryKey } from '@tanstack/react-query';
import { SortOrder } from '.';

export type ReviewsQueryOptionsType = {
  shop_id?: string;
  user?: string;
  product?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export interface IListingsParams {
  host?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export type ListsQueryOptionsType = {
  host?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  sortedBy?: SortOrder;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};


export interface PaginatorInfo<T> {
  docs: T[];

  totalDocs: number;

  limit: number;

  // * Page info

  page: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPrevPage: boolean;

  nextPage: number;

  prevPage: number;

  pagingCounter: number;
}
