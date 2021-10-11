import * as React from 'react';

import { VStack, Text, Heading, Box, Image } from '@chakra-ui/react';
import AddSubexerciseButton from './add-subexercise-button';
import { NoData } from '../../../common/undraw/undraw-no-data';

const NoSubexercisesPanel = () => {
  return (
    <VStack pt="5">
      <NoData />
      <Heading pt="2" size="sm">
        No subexercises for this exercise yet
      </Heading>
      <Text pb="2" fontSize="sm">
        Get started by adding a new subexercise
      </Text>
      <AddSubexerciseButton size="sm" />
    </VStack>
  );
};

export default NoSubexercisesPanel;
