import { Listing, Reservation, User } from '@prisma/client';

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface TLogin {
  email: string;
  password: string;
}

export interface loginResponse {
  message: string;
  token: string;
  expires_in: string;
  user: IUser;
}

export interface TRegister {
  email: string;
  name: string;
  password: string;
}

export interface TListing{
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  price: number;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IListing {
  _id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  host: IUser;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  price: number;
  createdAt: Date
  updatedAt: Date
  reservations: IReservation[];
}

export interface IReservation {
  _id: string;
  listing: IListing;
  startDate: Date
  endDate: Date
  totalPrice : number
  createdAt: Date
  updatedAt: Date
  user: IUser[]
}
