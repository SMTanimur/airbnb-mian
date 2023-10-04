import { useQuery } from '@tanstack/react-query';
import { IReservation } from '../types';
import { reservationClient } from '../services/reservations.service';

export const useReservationsQuery = () => {
  return useQuery<IReservation[]>(
    ['reservations'],
  reservationClient.getUserReservations,
    {
      keepPreviousData: true,
    }
  );
};
