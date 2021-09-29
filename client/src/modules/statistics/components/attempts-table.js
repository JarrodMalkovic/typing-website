import * as React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Avatar,
  HStack,
  Text,
  Link,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { calculateHumanReadableTimeString } from '../../../common/utils/calculate-human-readable-time-string';
import NavLink from 'next/link';

const getAttempts = async (category) => {
  const { data } =
    category === 'All Exercises'
      ? await axios.get(`${BASE_API_URL}/api/questions/attempts/`)
      : category === 'Challenge'
      ? await axios.get(
          `${BASE_API_URL}/api/questions/attempts/?category=challenge`,
        )
      : await axios.get(
          `${BASE_API_URL}/api/questions/attempts/?category=${category}`,
        );

  return data;
};

const AttemptsTable = ({ category }) => {
  const { data } = useQuery(['stats', 'attempts', category], () =>
    getAttempts(category),
  );

  console.log(data);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>User</Th>
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
              <Td>
                <HStack spacing="4">
                  <Avatar size="sm" src={row.user.avatar} />
                  <NavLink href={`/profile/${row.user.username}`}>
                    <Link
                      _hover={{
                        color: 'blue.400',
                        textDecoration: 'underline',
                      }}>
                      {row.user.username}
                    </Link>
                  </NavLink>
                </HStack>
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
  );
};

export default AttemptsTable;
