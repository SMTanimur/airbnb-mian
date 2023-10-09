

export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'asc',
  /** Sort records in descending order. */
  Desc = 'desc',
}


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

export interface TListing {
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
export interface TReservation {
  listingId: string;
  startDate: Date
  endDate: Date
  totalPrice: number;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
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
  createdAt: Date;
  updatedAt: Date;
  reservations: IReservation[];
}

export interface IReservation {
  _id: string;
  listingId: IListing;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
  user: IUser[];
}
