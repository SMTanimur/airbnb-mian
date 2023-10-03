
import { useQuery } from "@tanstack/react-query";
import { ListsQueryOptionsType, PaginatorInfo } from "../types/custom.types";
import { IListing } from "../types";
import { listClient } from "../services/listing.service";

 export const useListsQuery = (options: ListsQueryOptionsType) => {
  return useQuery<PaginatorInfo<IListing>, Error>(
    ['lists', options],
    listClient.getLists,
    {
      keepPreviousData: true,
    }
  );
};