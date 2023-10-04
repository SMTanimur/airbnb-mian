import { IReservation, TReservation } from '../types';
import { HttpClient } from '../utils/api/http';

export const reservationClient = {
  createReservation: (variables: TReservation) => {
    console.log(variables, 'variables');
    return HttpClient.post<{ message: string }>(`/reservations`, variables);
  },

  getList: (id: string) => {
    return HttpClient.get<IReservation>(`/reservations/${id}`);
  },
  getUserReservations: () => {
    return HttpClient.get<IReservation[]>(`/reservations`);
  },
  deleteReservation: (id: string) => {
    return HttpClient.delete<{ message: string }>(`/reservations/${id}`);
  }
};
