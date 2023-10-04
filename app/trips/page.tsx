'use client';
import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

import TripsClient from './TripsClient';
import { useMe } from '../hooks/useMe';
import { useReservationsQuery } from '../hooks/useGetUserReservations';
import Loader from '../components/Loader';
import { IReservation } from '../types';

const TripsPage = () => {
  const { me } = useMe();
  const { data:reservations, isLoading } = useReservationsQuery();
  if (isLoading) return <Loader />;
  if (!me) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    );
  }

  if (reservations?.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No trips found'
          subtitle='Looks like you havent reserved any trips.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient reservations={reservations as IReservation[]} currentUser={me} />
    </ClientOnly>
  );
};

export default TripsPage;
