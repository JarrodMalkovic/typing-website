import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
  Th,
  TabPanel,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Box,
  Text,
} from '@chakra-ui/react';
import DataTable from '../modules/dashboard/data-table';
import AddQuestionButton from '../modules/dashboard/add-question-button';
import { exercises } from '../common/contstants/exercises';
import { SearchIcon } from '@chakra-ui/icons';

const Dashboard = () => {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>User Management</Heading>
          <Spacer />
          <Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
              />
              <Input
                w="xs"
                mr="4"
                placeholder="Search users"
                value={filter}
                onChange={handleChange}
              />
            </InputGroup>
          </Box>
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        <Table>
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Date Joined</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Example_User</Td>
              <Td>12/3/2021</Td>
            </Tr>
            <Tr>
              <Td>Example_User</Td>
              <Td>12/3/2021</Td>
            </Tr>
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Dashboard;
