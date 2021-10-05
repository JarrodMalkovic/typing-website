import axios from 'axios';
import { useQuery } from 'react-query';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';

const getSubexercises = async (exerciseSlug) => {
  if (exerciseSlug.length <= 0) return [];

  const { data } = await axios.get(
    `${BASE_API_URL}/api/subexercises/exercise/${exerciseSlug}/`,
  );
  return data;
};

export const useSubexercises = (exerciseSlug) =>
  useQuery(['subexercise', 'dashboard', exerciseSlug], () =>
    getSubexercises(exerciseSlug),
  );
