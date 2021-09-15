import * as React from 'react';

import {
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Alert,
  Th,
  Td,
  chakra,
  AlertIcon,
  Spinner,
  Checkbox,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

const isChallenge = (str) => str === 'challenge';

const getPastAtttempts = async (exercise_slug) => {
  const res = isChallenge(exercise_slug)
    ? await axios.get(`${BASE_API_URL}/api/challenge/attempts/`)
    : await axios.get(
        `${BASE_API_URL}/api/practice/exercise/${exercise_slug}/attempts/`,
      );

  return res.data;
};

const PastAttemptsTable = ({ exercise_slug }) => {
  const { data } = useQuery(exercise_slug, () =>
    getPastAtttempts(exercise_slug),
  );

  console.log(data);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Subexercise</Th>
          <Th>Date</Th>
          <Th isNumeric>Score</Th>
          <Th isNumeric>WPM</Th>
          <Th isNumeric>Accuracy</Th>
          <Th isNumeric>Time Elapsed</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.map((row) => (
            <Tr>
              <Td>idk</Td>
              <Td>idk</Td>
              <Td isNumeric>{row.score}</Td>
              <Td isNumeric>{row.wpm}</Td>
              <Td isNumeric>{row.accuracy}</Td>
              <Td isNumeric>{row.time_elapsed}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

PastAttemptsTable.propTypes = {
  exercise_slug: PropTypes.string,
  filter: PropTypes.string,
};

export default PastAttemptsTable;
