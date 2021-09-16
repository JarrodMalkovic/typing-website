import * as React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

import Confetti from 'react-confetti';
import PropTypes from 'prop-types';
import { caculateWPM } from '../utils/calculate-wpm';
import { calculateTimeTaken } from '../utils/calculate-time-taken';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useMutation } from 'react-query';

const submitPracticeAttempt = async (exercise, body) => {
  const res = await axios.post(`${BASE_API_URL}/api/practice/attempt`, {
    subexercise_slug: exercise,
    ...body,
  });

  return res.data;
};

const ExerciseSummary = ({
  startDate,
  wordsTyped,
  accuracy,
  exercise,
  restart,
}) => {
  const [wpm] = React.useState(caculateWPM(startDate, wordsTyped));
  const [timeTaken] = React.useState(calculateTimeTaken(startDate, new Date()));
  const [score] = React.useState(wpm * (accuracy / 100));

  const { mutate } = useMutation(() =>
    submitPracticeAttempt(exercise, {
      wpm,
      time_elapsed: timeTaken,
      score,
      accuracy,
    }),
  );

  React.useEffect(() => {
    localStorage.removeItem(`${exercise}-accuracy`);
    localStorage.removeItem(`${exercise}-words-typed`);
    localStorage.removeItem(`${exercise}-current-question-index`);
    localStorage.removeItem(`${exercise}-time-elapsed`);
  }, [exercise]);

  React.useEffect(() => {
    mutate();
  }, []);

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
          <Text>Score: {wpm * (accuracy / 100)}</Text>
          <Text>Time Taken: {timeTaken} seconds</Text>
        </HStack>
        <ButtonGroup>
          <Button size="sm" variant="ghost" onClick={restart}>
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
  exercise: PropTypes.string,
};

export default ExerciseSummary;
