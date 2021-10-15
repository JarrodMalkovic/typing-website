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
  Select,
  Text,
} from '@chakra-ui/react';
import DataTable from '../modules/dashboard/data-table';
import AddQuestionButton from '../modules/dashboard/add-question-button';
import { SearchIcon } from '@chakra-ui/icons';
import { useExercises } from '../modules/exercises/hooks/use-exercises';
import { useNonAdminRedirect } from '../modules/auth/hooks/use-non-admin-redirect';
import Spinner from '../common/components/spinner';
import { useTitle } from 'react-use';

const Dashboard = () => {
  useTitle('KeyKorea - Questions Dashboard');
  const { isLoading: isAuthLoading } = useNonAdminRedirect('/');
  const [filter, setFilter] = React.useState('');
  const { data: exercises, isLoading } = useExercises();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    setFilter('');
  };

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
          <Flex>
            <Box>
              <Heading>Question Dashboard</Heading>
              <Text>
                Add new questions or edit and delete existing questions
              </Text>
            </Box>
          </Flex>
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
                  placeholder="Search rows..."
                  value={filter}
                  onChange={handleChange}
                />
              </InputGroup>
            </Flex>
            <AddQuestionButton mt={{ base: '2', md: '0' }} />
          </Flex>
        </Box>

        {isLoading || !exercises ? (
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
                  <DataTable
                    exercise_slug={value.exercise_slug}
                    isDictionExercise={value.allow_audio_files_in_questions}
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
