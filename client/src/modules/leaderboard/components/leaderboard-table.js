import * as React from 'react';

const isChallenge = (str) => str.toLowerCase() === 'challenge';

import {
  Table,
  Thead,
  Tbody,
  VStack,
  Heading,
  Avatar,
  Tr,
  HStack,
  Text,
  Th,
  Box,
  Td,
  Link,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import NavLink from 'next/link';
import { calculateHumanReadableTimeString } from '../../../common/utils/calculate-human-readable-time-string';
import NoAttemptsPanel from '../../exercises/components/no-attempts-panel';
import Spinner from '../../../common/components/spinner';

const getLeaderboard = async (category) => {
  const res =
    category === 'All Exercises'
      ? await axios.get(`${BASE_API_URL}/api/questions/leaderboard/`)
      : await axios.get(
          `${BASE_API_URL}/api/questions/leaderboard/?category=${category}`,
        );

  return res.data;
};

const LeaderboardTable = ({ category }) => {
  const { isLoading, data, isError } = useQuery(
    ['leaderboard', category],
    () => getLeaderboard(category),
    {
      retry: 3,
      retryDelay: 0,
    },
  );

  return (
    <Box spacing="4" overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th> Rank </Th>
            <Th>User</Th>

            {!isChallenge(category) && <Th>Subexercise</Th>}

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
                <Td>
                  <NavLink href={`/profile/${row.user.username}`}>
                    <HStack>
                      <Avatar src={row.user.avatar} size="sm" />
                      <Link
                        _hover={{
                          color: 'blue.400',
                          textDecoration: 'underline',
                        }}>
                        {row.user.username}
                      </Link>
                    </HStack>
                  </NavLink>
                </Td>

                {!isChallenge(category) && (
                  <Td>{row.subexercise_slug.subexercise_name}</Td>
                )}

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
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <VStack mt="8">
          <Heading size="md" textAlign="center">
            Sorry, something went wrong.
          </Heading>{' '}
          <Text textAlign="center">Could not fetch leaderboard data.</Text>
        </VStack>
      ) : (
        data.length <= 0 && <NoAttemptsPanel />
      )}
    </Box>
  );
};

LeaderboardTable.propTypes = {
  exercise_slug: PropTypes.string,
  filter: PropTypes.string,
};

export default LeaderboardTable;
