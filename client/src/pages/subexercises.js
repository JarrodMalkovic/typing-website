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
import SubexercisesTable from '../modules/subexercises/components/subexercises-table';

const Dashboard = () => {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>Subxercise Dashboard</Heading>
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
                placeholder="Search subexercises..."
                value={filter}
                onChange={handleChange}
              />
            </InputGroup>
          </Box>
          <AddExerciseButton />
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Exercise 1</Tab>
            <Tab>Exercise 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel marginX="0" paddingX="0">
              <SubexercisesTable />
            </TabPanel>
            <TabPanel marginX="0" paddingX="0">
              <SubexercisesTable />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Dashboard;
