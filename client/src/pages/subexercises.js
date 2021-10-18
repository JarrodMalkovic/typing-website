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
  Select,
  Box,
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
  const { data: exercises, isLoading, isError } = useExercises();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Box
          display={{ base: '', md: 'flex' }}
          alignItems={{ base: '', md: 'flex' }}
          justifyContent={{ base: '', md: 'space-between' }}>
          <Box>
            <Heading>Subexercise Dashboard</Heading>
            <Text>
              Add new subexercise modules or edit, delete and reorder existing
              modules
            </Text>
          </Box>

          <AddSubexerciseButton width={{ base: '100%', md: '48' }} />
        </Box>

        {isError ? (
          <VStack my="8">
            <Heading size="md" textAlign="center">
              Sorry, something went wrong.
            </Heading>
            <Text textAlign="center">Could not exercise data.</Text>
          </VStack>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Tabs
            isLazy
            variant="enclosed"
            index={tabIndex}
            onChange={handleTabsChange}>
            <Select
              onChange={(e) => setTabIndex(e.target.value * 1)}
              display={{ base: 'flex', lg: 'none' }}>
              {Object.entries(exercises).map(([key, value], idx) => (
                <option key={idx} value={idx}>
                  {value.exercise_name}
                </option>
              ))}
            </Select>
            <TabList display={{ base: 'none', lg: 'flex' }}>
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
