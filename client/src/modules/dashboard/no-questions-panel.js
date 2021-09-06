import * as React from 'react';

import { VStack, Text, Heading } from '@chakra-ui/react';
import AddQuestionButton from './add-question-button';

const NoQuestionsPanel = () => {
  return (
    <VStack spacing="2">
      <Heading size="sm">No questions for this exercise yet</Heading>
      <Text pb="3" fontSize="sm">
        Get started by adding a new question.
      </Text>
      <AddQuestionButton size="sm" />
    </VStack>
  );
};

export default NoQuestionsPanel;
