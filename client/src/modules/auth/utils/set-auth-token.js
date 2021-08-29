import axios from 'axios';

const setAuthToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { setAuthToken };
