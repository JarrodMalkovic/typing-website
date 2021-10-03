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
import { SearchIcon } from '@chakra-ui/icons';
import { useExercises } from '../modules/exercises/hooks/use-exercises';

const Dashboard = () => {
  const [filter, setFilter] = React.useState('');
  const { data: exercises, isLoading } = useExercises();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>Question Dashboard</Heading>
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
                placeholder="Search rows..."
                value={filter}
                onChange={handleChange}
              />
            </InputGroup>
          </Box>
          <AddQuestionButton />
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <Tabs isLazy variant="enclosed" top={40}>
            <TabList>
              {Object.entries(exercises).map(([key, value], idx) => (
                <Tab key={idx}>{value.exercise_name}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {Object.entries(exercises).map(([key, value], idx) => (
                <TabPanel paddingX="0" key={idx}>
                  <DataTable
                    exercise_slug={value.exercise_slug}
                    filter={filter}
                  />
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
