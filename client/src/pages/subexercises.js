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
  Spacer,
  Text,
} from '@chakra-ui/react';
import SubexercisesTable from '../modules/subexercises/components/subexercises-table';
import AddSubexerciseButton from '../modules/subexercises/components/add-subexercise-button';
import { useExercises } from '../modules/exercises/hooks/use-exercises';
import { useTitle } from 'react-use';
import { useNonAdminRedirect } from '../modules/auth/hooks/use-non-admin-redirect';
import Spinner from '../common/components/spinner';

const Dashboard = () => {
  useTitle('KeyKorea - Subexercises Dashboard');
  const { isLoading: isAuthLoading } = useNonAdminRedirect('/');
  const { data: exercises, isLoading } = useExercises();

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>Subxercise Dashboard</Heading>
          <Spacer />

          <AddSubexerciseButton />
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <Tabs isLazy variant="enclosed">
            <TabList>
              {Object.entries(exercises).map(([key, value], idx) => (
                <Tab key={idx}>{value.exercise_name}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {Object.entries(exercises).map(([key, value], idx) => (
                <TabPanel paddingX="0" key={idx}>
                  <SubexercisesTable exercise_slug={value.exercise_slug} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}
      </VStack>
    </Container>
  );
};

export default Dashboard;
