import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { authorizationAtom } from '../utils/authorization-atom';
import { API_ENDPOINTS } from '../utils/api/api-endpoints';
import { userClient } from '../services/user.service';

export function useMe() {
  const [isAuthorized] = useAtom(authorizationAtom);

  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.ME],
    userClient.me,
    {
      enabled: isAuthorized,
      retry: false,
    }
  );
  //TODO: do some improvement here
  return { me: data, isLoading, error, isAuthorized };
}
