'use client';

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { IReservation, IUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservationClient } from "../services/reservations.service";

interface TripsClientProps {
  reservations: IReservation[],
  currentUser?: IUser | null,
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
 const {mutateAsync,isLoading}=useMutation(reservationClient.deleteReservation)
 const queryClient = useQueryClient();
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    toast.promise(mutateAsync(id), {
      loading: 'creating...',
      success: data => {
        queryClient.invalidateQueries(['lists']);
        queryClient.invalidateQueries(['reservations']);
        router.refresh();
        return  <b> {data.message}</b>;
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data.message}</b>;
      },
    });
  }, [router]);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation: IReservation) => (
          <ListingCard
            key={reservation._id}
            data={reservation.listingId}
            reservation={reservation}
            actionId={reservation._id}
            onAction={onCancel}
            disabled={deletingId === reservation._id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default TripsClient;