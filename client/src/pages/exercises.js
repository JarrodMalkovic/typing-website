import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import AddExerciseButton from '../modules/exercises/components/add-exercise-button';
import ExercisesTable from '../modules/exercises/components/exercises-table';
import { useNonAdminRedirect } from '../modules/auth/hooks/use-non-admin-redirect';
import Spinner from '../common/components/spinner';
import { useTitle } from 'react-use';

const Dashboard = () => {
  useTitle('KeyKorea - Exercises Dashboard');
  const { isLoading: isAuthLoading } = useNonAdminRedirect('/');
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Box
          display={{ base: '', lg: 'flex' }}
          alignItems={{ base: '', lg: 'flex' }}
          justifyContent={{ base: '', lg: 'space-between' }}>
          <Box>
            <Heading>Exercise Dashboard</Heading>{' '}
            <Text>Add new exercise modules or edit existing modules.</Text>
          </Box>
          <Flex flexDir={{ base: 'column', md: 'row' }}>
            <Flex>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon />}
                />
                <Input
                  w={{ base: '100%', md: 'xs' }}
                  mr={{ base: '0', md: '4' }}
                  mt={{ base: '2', md: '0' }}
                  placeholder="Search exercises..."
                  value={filter}
                  onChange={handleChange}
                />
              </InputGroup>
            </Flex>
            <AddExerciseButton mt={{ base: '2', md: '0' }} />
          </Flex>
        </Box>
        <ExercisesTable filter={filter} />
      </VStack>
    </Container>
  );
};

export default Dashboard;
