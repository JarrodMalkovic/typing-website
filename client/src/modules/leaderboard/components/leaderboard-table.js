import * as React from 'react';

const isChallenge = (str) => str.toLowerCase() === 'challenge';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Heading,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import NavLink from 'next/link';
import { calculateHumanReadableTimeString } from '../../../common/utils/calculate-human-readable-time-string';
import NoAttemptsPanel from '../../exercises/components/no-attempts-panel';

const getLeaderboard = async (category) => {
  const res =
    category === 'All Exercises'
      ? await axios.get(`${BASE_API_URL}/api/questions/leaderboard/`)
      : category === 'Challenge'
      ? await axios.get(
          `${BASE_API_URL}/api/challenge/leaderboard/?category=challenge`,
        )
      : await axios.get(
          `${BASE_API_URL}/api/questions/leaderboard/?category=${category}`,
        );

  return res.data;
};

const LeaderboardTable = ({ category }) => {
  const { isLoading, data } = useQuery(['leaderboard', category], () =>
    getLeaderboard(category),
  );

  return (
    <VStack spacing="4">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th> Rank </Th>
            {!isChallenge(category) && <Th>Subexercise</Th>}
            <Th>User</Th>

            <Th isNumeric>Score</Th>
            <Th isNumeric>WPM</Th>
            <Th isNumeric>Accuracy</Th>
            <Th isNumeric>Time Elapsed</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((row, idx) => (
              <Tr>
                <Td>#{idx + 1}</Td>
                {!isChallenge(category) && (
                  <Td>{row.subexercise_slug.subexercise_name}</Td>
                )}
                <Td>
                  <NavLink href={`/profile/${row.user.username}`}>
                    <Link
                      _hover={{
                        color: 'blue.400',
                        textDecoration: 'underline',
                      }}>
                      {row.user.username}
                    </Link>
                  </NavLink>
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
      {!isLoading && data.length <= 0 && <NoAttemptsPanel />}
    </VStack>
  );
};

LeaderboardTable.propTypes = {
  exercise_slug: PropTypes.string,
  filter: PropTypes.string,
};

export default LeaderboardTable;
