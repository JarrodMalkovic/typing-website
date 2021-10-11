import { VStack, Heading, Text } from '@chakra-ui/react';
import { NoData } from '../../../common/undraw/undraw-no-data';
import Link from 'next/link';
import AddExerciseButton from './add-exercise-button';

const NoExercisesPanel = ({ slug }) => {
  return (
    <VStack pt="5">
      <NoData />
      <Heading pt="2" size="sm">
        No exercises yet
      </Heading>
      <Text pb="2" fontSize="sm">
        Get started by adding a new exercise
      </Text>
      <AddExerciseButton size="sm" />
    </VStack>
  );
};

export default NoExercisesPanel;
