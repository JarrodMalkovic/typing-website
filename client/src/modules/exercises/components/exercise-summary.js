import * as React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react';

import Confetti from 'react-confetti';
import PropTypes from 'prop-types';
import { caculateWPM } from '../utils/calculate-wpm';

const ExerciseSummary = ({
  setCurrentQuestionIndex,
  startDate,
  wordsTyped,
  accuracy,
}) => {
  const [wpm] = React.useState(caculateWPM(startDate, wordsTyped));

  return (
    <Box>
      <Confetti numberOfPieces={500} gravity={0.1} recycle={false} />
      <Stack align={'center'}>
        <Heading>Woohoo! You finished the exercise! 🥳</Heading>
        <Heading as="h2" size="md">
          Exercise Summary
        </Heading>
        <HStack spacing="8">
          <Text>Speed: {wpm} WPM</Text>
          <Text>Accuracy: {accuracy}%</Text>
          <Text>Score: 32</Text>
          <Text>Time Taken: 1:32</Text>
        </HStack>
        <ButtonGroup>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setCurrentQuestionIndex(0)}>
            Restart Exercise
          </Button>
          <Button size="sm">Next Exercise</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

ExerciseSummary.propTypes = {
  setCurrentQuestionIndex: PropTypes.func,
  startDate: PropTypes.object,
  wordsTyped: PropTypes.number,
  accuracy: PropTypes.number,
};

export default ExerciseSummary;
