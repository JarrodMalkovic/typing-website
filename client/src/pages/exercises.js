import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Spacer,
  Box,
  Text,
} from '@chakra-ui/react';
import DataTable from '../modules/dashboard/data-table';
import AddQuestionButton from '../modules/dashboard/add-question-button';
import { exercises } from '../common/contstants/exercises';
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
        <Flex>
          <Heading>Exercise Dashboard</Heading>
          <Spacer />
          <Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
              />
              <Input
                w="xs"
                mr="3"
                placeholder="Search exercises..."
                value={filter}
                onChange={handleChange}
              />
            </InputGroup>
          </Box>
          <AddExerciseButton />
        </Flex>
        <Text>
          Add new exercise modules or edit existing modules.
        </Text>
        <ExercisesTable filter={filter} />
      </VStack>
    </Container>
  );
};

export default Dashboard;
