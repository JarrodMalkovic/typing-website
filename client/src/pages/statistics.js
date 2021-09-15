import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Flex,
  Spacer,
  Menu,
  Box,
  MenuList,
  MenuButton,
  MenuItem,
  StatGroup,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useRadioGroup,
  Tr,
  Th,
  Td,
  Table,
  Thead,
  Tbody,
  useColorModeValue,
  StatHelpText,
  useTheme,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import StatsCard from '../modules/statistics/components/stats-card';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import ChartCard from '../modules/statistics/components/chart-card';
const sampleData = [
  {
    name: '12/3/2021',
    score: 2400,
    amt: 2400,
  },
  {
    name: '12/3/2021',
    score: 1398,
    amt: 2210,
  },
  {
    name: '12/3/2021',
    score: 9800,
    amt: 2290,
  },
  {
    name: '12/3/2021',
    score: 3908,
    amt: 2000,
  },
  {
    name: '12/3/2021',
    score: 4800,
    amt: 2181,
  },
  {
    name: '12/3/2021',
    score: 3800,
    amt: 2500,
  },
  {
    name: '12/3/2021',
    score: 4300,
    amt: 2100,
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const options = ['wpm', 'accuracy', 'time'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'stat',
    defaultValue: 'wpm',
    onChange: console.log,
  });

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={4} width="100%" align="stretch">
        <Flex>
          <Heading>Letter Statistics</Heading>
          <Spacer />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Select Category
            </MenuButton>
            <MenuList>
              <MenuItem>All Exercises</MenuItem>
              <MenuItem>Challenge Mode</MenuItem>
              <MenuItem>Letters</MenuItem>
              <MenuItem>Words</MenuItem>
              <MenuItem>Long Sentences</MenuItem>
              <MenuItem>Diction</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={'4'}>
          <StatsCard title="Average WPM" stat="90.42" time="Last 30 days" />{' '}
          <StatsCard title="Average WPM" stat="90.42" time="Last 30 days" />
          <StatsCard title="Average WPM" stat="90.42" time="Last 30 days" />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={'4'}>
          <ChartCard />
          <ChartCard />
          <ChartCard />
        </SimpleGrid>
        <Box
          border="1px solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          rounded={'lg'}>
          <Table>
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
          </Table>
        </Box>
      </VStack>
    </Container>
  );
};

export default Dashboard;
