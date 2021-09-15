import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Flex,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Menu,
  Spacer,
  useColorModeValue,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../common/contstants/base-api-url';
import LeaderboardMenu from '../modules/leaderboard/components/leaderboard-menu';

const getLeaderboard = async (category) => {
  const res =
    category === 'All Exercises'
      ? await axios.get(`${BASE_API_URL}/api/`)
      : category === 'Challenge'
      ? await axios.get(`${BASE_API_URL}/api/challenge/leaderboard/`)
      : await axios.get(`${BASE_API_URL}/api/practice/${category}/leaderboard`);
};

const Leaderboard = () => {
  const [category, setCategory] = React.useState(null);

  const { data } = useQuery(category, () => getLeaderboard(category));

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>{category || 'All Exercises'} Leaderboard</Heading>
          <Spacer />
          <LeaderboardMenu setCategory={setCategory} />
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Username</Th>
              <Th isNumeric>Score</Th>
              <Th isNumeric>WPM</Th>
              <Th isNumeric>Accuracy</Th>
              <Th isNumeric>Time Elapsed</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td> <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td> <Td isNumeric>25.4</Td>{' '}
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td> <Td isNumeric>25.4</Td>{' '}
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>{' '}
            <Tr>
              <Td>3</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td> <Td isNumeric>25.4</Td>{' '}
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>{' '}
            <Tr>
              <Td>3</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td> <Td isNumeric>25.4</Td>{' '}
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>{' '}
            <Tr>
              <Td>3</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td> <Td isNumeric>25.4</Td>{' '}
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>{' '}
            <Tr>
              <Td>3</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td> <Td isNumeric>25.4</Td>{' '}
              <Td isNumeric>25.4</Td>
              <Td isNumeric>25.4</Td>
            </Tr>{' '}
          </Tbody>
        </Table>{' '}
      </VStack>
    </Container>
  );
};

export default Leaderboard;
