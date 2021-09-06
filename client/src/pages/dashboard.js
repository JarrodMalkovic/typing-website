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
  Spacer,
  Box,
  Text,
} from '@chakra-ui/react';
import DataTable from '../modules/dashboard/data-table';
import AddQuestionButton from '../modules/dashboard/add-question-button';
import { exercises } from '../common/contstants/exercises';
import { SearchIcon } from '@chakra-ui/icons';

const Dashboard = () => {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>Admin Dashboard</Heading>
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
        <Tabs isLazy variant="enclosed">
          <TabList>
            {Object.entries(exercises).map(([key, value], idx) => (
              <Tab key={idx}>{value.name}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {Object.entries(exercises).map(([key, value], idx) => (
              <TabPanel paddingX="0" key={idx}>
                <DataTable exercise_slug={value.slug} filter={filter} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Dashboard;
