import * as React from 'react';

import { VStack, Text, Heading, Box, Image } from '@chakra-ui/react';
import AddQuestionButton from './add-question-button';
import { NoData } from '../../common/undraw/undraw-no-data';

const NoQuestionsPanel = () => {
  return (
    <VStack pt="5">
      <NoData />
      <Heading pt="2" size="sm">
        No questions for this exercise yet
      </Heading>
      <Text pb="2" fontSize="sm">
        Get started by adding a new question.
      </Text>
      <AddQuestionButton size="sm" />
    </VStack>
  );
};

export default NoQuestionsPanel;
