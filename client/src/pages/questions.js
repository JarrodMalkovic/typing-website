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
import ExportToExcel from '../modules/dashboard/upload-questions-button';
import UploadQuestions from '../modules/dashboard/file-upload';
import { useNonAdminRedirect } from '../modules/auth/hooks/use-non-admin-redirect';
import Spinner from '../common/components/spinner';
import { useTitle } from 'react-use';

const Dashboard = () => {
  useTitle('KeyKorea - Questions Dashboard');
  const { isLoading: isAuthLoading } = useNonAdminRedirect('/');
  const [filter, setFilter] = React.useState('');
  const { data: exercises, isLoading } = useExercises();

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
          <Spinner />
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
