import axios from 'axios';
import { useQuery } from 'react-query';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';

const getExercises = async () => {
  const { data } = await axios.get(`${BASE_API_URL}/api/exercises/`);
  return data;
};

export const useExercises = () => useQuery('exercises', getExercises);
