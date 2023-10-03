import { IUser, TLogin, TRegister, loginResponse } from "../types";
import { API_ENDPOINTS } from "../utils/api/api-endpoints";
import { HttpClient } from "../utils/api/http";

export const userClient = {
  me: () => {
    return HttpClient.get<IUser>(`/users/${API_ENDPOINTS.ME}`);
  },
  login: (variables: TLogin) => {
    return HttpClient.post<loginResponse>(
      `/auth/${API_ENDPOINTS.LOGIN}`,
      variables
    );
  },
 
 
  logout: () => {
    return HttpClient.post<any>(`/auth/${API_ENDPOINTS.LOGOUT}`, {});
  },

  register: (variables: TRegister) => {
    return HttpClient.post<loginResponse>(
      `/auth/${API_ENDPOINTS.REGISTER}`,
      variables
    );
  },
};
