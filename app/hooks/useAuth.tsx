import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { userClient } from '../services/user.service';
import { TLogin, TRegister } from '../types';
import toast from 'react-hot-toast';
import { useToken } from './use-token';
import { authorizationAtom } from '../utils/authorization-atom';
import useRegisterModal from './useRegisterModal';
import useLoginModal from './useLoginModal';

export function useAuth() {
  const router = useRouter();
  const { setToken, removeToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const queryClient = useQueryClient();
  const {
    mutateAsync: signupMutation,
    isLoading: SignupLoading,
    isError: IsSignupError,
  } = useMutation(userClient.register);

  const {
    mutateAsync: loginMutation,
    isLoading: LoginLoading,
    isError: IsLoginError,
  } = useMutation(userClient.login);
  const {
    mutateAsync: logoutMutation,
    isLoading: LogoutLoading,
    isError: IsLogoutError,
  } = useMutation(userClient.logout);

  const loginForm = useForm<TLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<TRegister>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });
  const attemptToLogin = async (data: TLogin) => {
    toast.promise(loginMutation(data), {
      loading: 'login...',
      success: data => {
        queryClient.invalidateQueries(['me']);
        queryClient.invalidateQueries(['currentUser']);
        setAuthorized(true);
        setToken(data.token);
        loginModal.onClose();

        router.push(`${window.location.origin}`);
        return <b>{data.message}</b>;
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data?.message}</b>;
      },
    });
  };

  const attemptToRegister = async (data: TRegister) => {
    toast.promise(signupMutation(data), {
      loading: 'registering...',
      success: data => {
        setToken(data.token);
        setAuthorized(true);
        queryClient.invalidateQueries(['me']);
        queryClient.invalidateQueries(['currentUser']);
        registerModal.onClose();
        router.push(`${window.location.origin}`);
        return <b> {data.message}</b>;
      },
      error: error => {
        const {
          response: { data },
        }: any = error ?? {};

        return <b> {data.message}</b>;
      },
    });
  };

  const logout = async () => {
    try {
      toast.promise(logoutMutation(), {
        loading: 'Logging out...',
        success: data => {
          removeToken();
          // setIsAuthenticated(false)
          router.push(`${window.location.origin}/?redirect=false`);
          queryClient.resetQueries(['me']);
          queryClient.resetQueries();
          queryClient.removeQueries();
          setToken('');
          setAuthorized(false);
          return <b>{data.message}</b>;
        },
        error: 'Failed to Logout!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    loginMutation,
    attemptToLogin,
    LoginLoading,
    IsLoginError,
    loginForm,
    registerForm,
    attemptToRegister,
    SignupLoading,
    IsSignupError,
    logout,
    LogoutLoading,
    IsLogoutError,
  };
}
