import * as React from 'react';

import {
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Heading,
  Box,
  Alert,
  Th,
  Td,
  chakra,
  Button,
  AlertIcon,
  Spinner,
  Center,
  Checkbox,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { calculateHumanReadableTimeString } from '../../../common/utils/calculate-human-readable-time-string';
import NoPastAttemptsPanel from './no-past-attempts-panel';

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
  const { data, isLoading } = useQuery(['attempts', exercise_slug], () =>
    getPastAtttempts(exercise_slug),
  );

  return (
    <VStack spacing="4">
      <Table variant="simple">
        <Thead>
          <Tr>
            {!isChallenge(exercise_slug) && <Th>Subexercise</Th>}
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
                {!isChallenge(exercise_slug) && (
                  <Td>{row.subexercise_slug.subexercise_name}</Td>
                )}
                <Td>
                  {(() => {
                    const date = new Date(row.created_at);
                    return date.toDateString();
                  })()}
                </Td>
                <Td isNumeric>{row.score.toFixed(2)}</Td>
                <Td isNumeric>{row.wpm.toFixed(2)}</Td>
                <Td isNumeric>%{row.accuracy.toFixed(2)}</Td>
                <Td isNumeric>
                  {calculateHumanReadableTimeString(row.time_elapsed * 1000)}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {isLoading && <Spinner color="blue.400" />}
      {!isLoading && data.length <= 0 && <NoPastAttemptsPanel />}
    </VStack>
  );
};

PastAttemptsTable.propTypes = {
  exercise_slug: PropTypes.string,
  filter: PropTypes.string,
};

export default PastAttemptsTable;
