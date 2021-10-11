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
  Text,
  Select,
} from '@chakra-ui/react';
import PastAttemptsTable from '../modules/exercises/components/past-attempts-table';
import { useExercises } from '../modules/exercises/hooks/use-exercises';
import { useUnauthorizedRedirect } from '../modules/auth/hooks/use-unauthorized-redirect';
import Spinner from '../common/components/spinner';
import { useTitle } from 'react-use';

const PastAttempts = () => {
  useTitle('KeyKorea - Past Attempts Dashboard');
  const { isLoading: isAuthLoading } = useUnauthorizedRedirect('auth/sign-in');
  const { data: exercises, isLoading } = useExercises();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const tabs =
    isLoading || !exercises
      ? [{ name: 'Challenge', slug: 'challenge' }]
      : [
          ...Object.entries(exercises).map(([key, value]) => {
            return { name: value.exercise_name, slug: value.exercise_slug };
          }),
          { name: 'Challenge', slug: 'challenge' },
        ];

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>Past Attempts</Heading>
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        {isLoading ? (
          <Spinner />
        ) : (
          <Tabs
            isLazy
            variant="enclosed"
            index={tabIndex}
            onChange={handleTabsChange}>
            <Select display={{ base: 'flex', lg: 'none' }}>
              {tabs.map((value, idx) => (
                <option
                  key={idx}
                  value={value.name}
                  onClick={() => setTabIndex(idx)}>
                  {value.name}
                </option>
              ))}
            </Select>
            <TabList display={{ base: 'none', lg: 'flex' }}>
              {tabs.map((value, idx) => (
                <Tab key={idx}>{value.name}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {tabs.map((value, idx) => (
                <TabPanel paddingX="0" key={idx}>
                  <PastAttemptsTable exercise_slug={value.slug} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )}
      </VStack>
    </Container>
  );
};

export default PastAttempts;
