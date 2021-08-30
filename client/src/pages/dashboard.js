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
  Button,
  Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import DataTable from '../modules/dashboard/data-table';
import AddExerciseButton from '../modules/dashboard/add-exercise-button';

const tabData = [
  { label: 'Letters' },
  { label: 'Syllables' },
  { label: 'Words' },
  { label: 'Short Sentences' },
  { label: 'Long Sentences' },
  { label: 'Diction' },
];

const Dashboard = () => {
  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>Admin Dashboard</Heading>
          <Spacer />
          <AddExerciseButton />
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        <Tabs variant="enclosed">
          <TabList>
            {tabData.map((tab, idx) => (
              <Tab key={idx}>{tab.label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabData.map((tab, idx) => (
              <TabPanel paddingX="0" key={idx}>
                <DataTable />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Dashboard;
