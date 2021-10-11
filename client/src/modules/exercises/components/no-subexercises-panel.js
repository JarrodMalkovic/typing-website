import * as React from 'react';

import { VStack, Heading } from '@chakra-ui/react';

const NoSubexercisesPanel = () => {
  return (
    <VStack>
      <Heading pt="2" size="sm">
        No subexercises for this exercise yet
      </Heading>
    </VStack>
  );
};

export default NoSubexercisesPanel;
