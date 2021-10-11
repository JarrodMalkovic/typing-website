import { useRouter } from 'next/router';
import { isServer } from '../../../common/utils/is-server';
import { useAuth } from './use-auth';

// Used to redirect a user to a different page if they are already authenticated
const useUnauthorizedRedirect = (redirectRoute = '/') => {
  const router = useRouter();

  const {
    state: { isAuthenticated, isLoading },
  } = useAuth();

  if (isServer()) {
    return { isLoading };
  }

  if (!isAuthenticated && !isLoading) {
    router.push(redirectRoute);
  }

  return { isLoading };
};

export { useUnauthorizedRedirect };
