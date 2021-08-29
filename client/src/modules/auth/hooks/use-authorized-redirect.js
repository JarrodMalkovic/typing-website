import { useRouter } from 'next/router';
import { isServer } from '../../../common/utils/is-server';
import { useAuth } from './use-auth';

// Used to redirect a user to a different page if they are already authenticated
const useAuthorizedRedirect = (redirectRoute = '/') => {
  const router = useRouter();

  const {
    state: { isAuthenticated },
  } = useAuth();

  if (isServer()) {
    return;
  }

  if (isAuthenticated) {
    router.push(redirectRoute);
  }
};

export { useAuthorizedRedirect };
