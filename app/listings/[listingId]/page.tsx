'use client';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';

import ListingClient from './ListingClient';
import { useMe } from '@/app/hooks/useMe';
import { useListQuery } from '@/app/hooks/useGetList';
import Loader from '@/app/components/Loader';
import { IListing } from '@/app/types';

interface IParams {
  listingId: string;
}

const ListingPage = ({ params }: { params: IParams }) => {
  const {data:listing,isLoading} = useListQuery(params.listingId as string);
  const { me: currentUser } = useMe();
  if(isLoading) return <Loader/>
  // const reservations = await getReservations(params);
  
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing }
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
