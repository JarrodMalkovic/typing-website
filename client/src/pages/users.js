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
import { SearchIcon } from '@chakra-ui/icons';
import UsersTable from '../modules/users/components/users-table';
import { useTitle } from 'react-use';
import { useNonAdminRedirect } from '../modules/auth/hooks/use-non-admin-redirect';
import Spinner from '../common/components/spinner';

const Dashboard = () => {
  useTitle('KeyKorea - User Management');
  const { isLoading: isAuthLoading } = useNonAdminRedirect('/');
  const [search, setSearch] = React.useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  if (isAuthLoading) {
    return <Spinner />;
  }

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
                value={search}
                onChange={handleChange}
              />
            </InputGroup>
          </HStack>
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        <UsersTable search={search} />
      </VStack>
    </Container>
  );
};

export default Dashboard;
