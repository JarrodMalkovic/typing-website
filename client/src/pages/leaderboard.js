import * as React from 'react';

import { Container, Heading, VStack, Box, Spacer } from '@chakra-ui/react';
import LeaderboardMenu from '../modules/leaderboard/components/leaderboard-menu';
import LeaderboardTable from '../modules/leaderboard/components/leaderboard-table';
import { useTitle } from 'react-use';

const Leaderboard = () => {
  const [category, setCategory] = React.useState({
    category: 'All Exercises',
    name: 'All Exercises',
  });

  useTitle(`KeyKorea - ${category.name} Leaderboard`);

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Box
          display={{ base: '', md: 'flex' }}
          alignItems={{ base: '', md: 'flex' }}
          justifyContent={{ base: '', md: 'space-between' }}>
          <Heading>{category.name} Leaderboard</Heading>

          <LeaderboardMenu
            width={{ base: '100%', md: '48' }}
            setCategory={setCategory}
          />
        </Box>
        <LeaderboardTable category={category.category} />
      </VStack>
    </Container>
  );
};

export default Leaderboard;
