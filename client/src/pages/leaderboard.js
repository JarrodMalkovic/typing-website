import * as React from 'react';

import { Container, Heading, VStack, Flex, Spacer } from '@chakra-ui/react';
import LeaderboardMenu from '../modules/leaderboard/components/leaderboard-menu';
import LeaderboardTable from '../modules/leaderboard/components/leaderboard-table';

const Leaderboard = () => {
  const [category, setCategory] = React.useState({
    category: 'All Exercises',
    name: 'All Exercises',
  });

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>{category.name} Leaderboard</Heading>
          <Spacer />
          <LeaderboardMenu setCategory={setCategory} />
        </Flex>
        <LeaderboardTable category={category.category} />
      </VStack>
    </Container>
  );
};

export default Leaderboard;
