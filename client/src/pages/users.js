import * as React from 'react';

import {
  Container,
  Heading,
  Button,
  VStack,
  Tabs,
  TabList,
  Tab,
  HStack,
  ButtonGroup,
  TabPanels,
  Table,
  Tr,
  Avatar,
  Td,
  Link,
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
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { BASE_API_URL } from '../common/contstants/base-api-url';
import { useQuery } from 'react-query';
import { string } from 'yup/lib/locale';
import PromoteUserButton from '../modules/users/components/promote-user-button';
import DemoteUserButton from '../modules/users/components/demote-user-button';
import BanUserButton from '../modules/users/components/ban-user-button';
import { humanReadableDateString } from '../common/utils/human-readable-date-string';
import NavLink from 'next/link';

const getUsers = async () => {
  const { data } = await axios.get(`${BASE_API_URL}/api/users/`);
  return data;
};

const Dashboard = () => {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const { data } = useQuery('users', getUsers);

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>User Management</Heading>
          <Spacer />
          <HStack spacing={-8}>
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
          </HStack>
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
              <Th>Email</Th>
              <Th>Role</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((user) => (
                <Tr>
                  <Td>
                    <HStack spacing="4">
                      <Avatar size="sm" src={user.avatar} />
                      <NavLink href={`/profile/${user.username}`}>
                        <Link
                          _hover={{
                            color: 'blue.400',
                            textDecoration: 'underline',
                          }}>
                          {user.username}
                        </Link>
                      </NavLink>
                    </HStack>
                  </Td>
                  <Td>{humanReadableDateString(user.created_at)}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    {user.is_superuser
                      ? 'Super Admin'
                      : user.is_staff
                      ? 'Admin'
                      : 'Student'}
                  </Td>
                  <Td textAlign="right">
                    <ButtonGroup>
                      {user.is_superuser ? null : user.is_staff ? (
                        <DemoteUserButton
                          username={user.username}
                          userId={user.id}
                        />
                      ) : (
                        <PromoteUserButton
                          username={user.username}
                          userId={user.id}
                        />
                      )}
                      {!user.is_superuser && (
                        <BanUserButton
                          username={user.username}
                          userId={user.id}
                        />
                      )}
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Dashboard;
