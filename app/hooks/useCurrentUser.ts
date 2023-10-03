
import { useQuery } from '@tanstack/react-query';
import { userClient } from '../services/user.service';


export function useCurrentUser() {

  const { data, isLoading, error } = useQuery(
    ['currentUser'],
    userClient.me,
    {
      retry: false,
    }
  );
  //TODO: do some improvement here
  return { currentUser: data, isLoading, error};
}
