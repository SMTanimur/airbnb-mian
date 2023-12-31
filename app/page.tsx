'use client';
import Container from '@/app/components/Container';
import EmptyState from '@/app/components/EmptyState';

import ClientOnly from './components/ClientOnly';
import { IListingsParams } from './types/custom.types';
import { useListsQuery } from './hooks/useGetLists';
import { useMe } from './hooks/useMe';
import ListingCard from './components/listings/ListingCard';
import Loader from './components/Loader';
import useFilterState from './hooks/useFilterState';

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = ({ searchParams }: HomeProps) => {
  const { filterState } = useFilterState();
  const { data, isLoading } = useListsQuery({
    limit: 30,
    category: searchParams.category,
    bathroomCount: searchParams.bathroomCount,
    endDate: searchParams.endDate,
    guestCount: searchParams.guestCount,
    host: searchParams.host,
    locationValue: searchParams.locationValue,
    roomCount: searchParams.roomCount,
    startDate: searchParams.startDate,
    maxPrice: searchParams.maxPrice,
    minPrice: searchParams.minPrice,
  });
  const { me: currentUser } = useMe();
  if (isLoading) return <Loader />;
  if (data?.docs.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  const listings = data?.docs || [];

  return (
    <ClientOnly>
      <Container>
        <div
          className='
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          '
        >
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing._id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
