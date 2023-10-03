import { useQuery } from '@tanstack/react-query';
import { IListing } from '../types';
import { listClient } from '../services/listing.service';

export const useListQuery = (id: string) => {
  return useQuery<IListing, Error>(
    ['lists', id],
    () => listClient.getList(id),
    {
      keepPreviousData: true,
    }
  );
};
