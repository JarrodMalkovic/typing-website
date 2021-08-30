import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { setAuthToken } from './set-auth-token';

const refreshAuthLogic = async (failedRequest) => {
  const res = await axios.post(`${BASE_API_URL}/api/auth/refresh/`, {
    refresh: localStorage.getItem('refresh-token'),
  });

  localStorage.setItem('access-token', res.data.access);

  failedRequest.response.config.headers[
    'Authorization'
  ] = `Bearer ${res.data.access}`;

  setAuthToken(res.data.access);
};

export { refreshAuthLogic };
