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
import { SearchIcon } from '@chakra-ui/icons';
import { exercises } from '../common/contstants/exercises';
import PastAttemptsTable from '../modules/exercises/components/past-attempts-table';

const tabs = [
  ...Object.entries(exercises),
  ['challenge', { name: 'Challenge', slug: 'challenge' }],
];

const PastAttempts = () => {
  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>Past Attempts</Heading>
          <Spacer />
          <Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
              />
              <Input w="xs" mr="4" placeholder="Search rows..." />
            </InputGroup>
          </Box>
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        <Tabs isLazy variant="enclosed">
          <TabList>
            {tabs.map(([key, value], idx) => (
              <Tab key={idx}>{value.name}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map(([key, value], idx) => (
              <TabPanel paddingX="0" key={idx}>
                <PastAttemptsTable exercise_slug={value.slug} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default PastAttempts;
