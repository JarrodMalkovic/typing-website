import * as React from 'react';

import { VStack, Heading } from '@chakra-ui/react';
import { NoData } from '../../../common/undraw/undraw-no-data';

const NoAttemptsPanel = () => {
  return (
    <VStack py="5">
      <NoData />
      <Heading pt="2" size="sm">
        No attempts for this exercise yet
      </Heading>
    </VStack>
  );
};

export default NoAttemptsPanel;
