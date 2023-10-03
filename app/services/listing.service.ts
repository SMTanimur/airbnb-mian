import { IUser, TListing, TLogin, TRegister, loginResponse } from "../types";
import { HttpClient } from "../utils/api/http";

export const listClient = {
  
  createList: (variables: TListing) => {
    return HttpClient.post<{message: string}>(
      `/lists`,
      variables
    );
  },

};
