import { IListing, TListing } from '../types';
import {
  ListsQueryOptionsType,
  PaginatorInfo,
  QueryParamsType,
} from '../types/custom.types';
import { HttpClient } from '../utils/api/http';

export const listClient = {
  createList: (variables: TListing) => {
    return HttpClient.post<{ message: string }>(`/lists`, variables);
  },

  getLists: async ({ queryKey }: QueryParamsType) => {
    const [_key, params] = queryKey;

    const {
      page = 1,
      bathroomCount,
      category,
      endDate,
      guestCount,
      host,
      locationValue,
      roomCount,
      startDate,
      limit = 15,
      orderBy = 'updatedAt',
      sortedBy = 'desc',
    } = params as ListsQueryOptionsType;

    const url = `/lists?${host ? `&host=${host}` : ''}${
      category ? `&category=${category}` : ''
    }${bathroomCount ? `bathroomCount=${bathroomCount}` : ''}${
      roomCount ? `&roomCount=${roomCount}` : ''
    }${locationValue ? `&locationValue=${locationValue}` : ''}${
      startDate ? `&startDate=${startDate}` : ''
    }${endDate ? `&endDate=${endDate}` : ''}
    ${
      guestCount ? `&guestCount=${guestCount}` : ''
    }&searchJoin=and&limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
    return HttpClient.get<PaginatorInfo<IListing>>(url);
  },
  getList: (id: string) => {
    return HttpClient.get<IListing>(`/lists/${id}`);
  },
};
