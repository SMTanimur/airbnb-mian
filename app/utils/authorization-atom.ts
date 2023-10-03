
import { atom } from 'jotai';
import Cookies from 'js-cookie';
import { AUTH_TOKEN_KEY } from '../constants';

export function checkIsLoggedIn() {
  const token = Cookies.get(AUTH_TOKEN_KEY);
  if (!token) return false;
  return true;
}
export const authorizationAtom = atom(checkIsLoggedIn());

