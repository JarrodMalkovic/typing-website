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

import PropTypes from 'prop-types';
import { caculateWPM } from '../utils/calculate-wpm';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useMutation } from 'react-query';
import { calculateTimeTaken } from '../utils/calculate-time-taken';
import { calculateScore } from '../utils/calculate-score';
import { displayErrors } from '../../../common/utils/display-errors';

const submitChallengeAttempt = async (data) => {
  const res = await axios.post(`${BASE_API_URL}/api/challenge/`, data);
  return res.data;
};

const ExerciseSummary = ({
  startDate,
  wordsTyped,
  accuracy,
  restartChallengeMode,
}) => {
  const [wpm] = React.useState(caculateWPM(startDate, wordsTyped));
  const [timeTaken] = React.useState(calculateTimeTaken(startDate, new Date()));
  const [score] = React.useState(calculateScore(accuracy, wpm));

  const { mutate, isError, error } = useMutation(() =>
    submitChallengeAttempt({ wpm, time_elapsed: timeTaken, accuracy, score }),
  );

  React.useEffect(() => {
    mutate();
  }, []);

  return (
    <Box>
      <Stack align={'center'}>
        {isError && displayErrors(error)}
        <Heading>Woohoo! You finished a challenge! 🥳</Heading>
        <Heading as="h2" size="md">
          Challenge Summary
        </Heading>
        <HStack spacing="8">
          <Text>Speed: {wpm} WPM</Text>
          <Text>Accuracy: {accuracy}%</Text>
          <Text>Score: {score}</Text>
          <Text>Time Taken: {timeTaken.toFixed(2)} seconds</Text>
        </HStack>
        <ButtonGroup>
          <Button size="sm" onClick={restartChallengeMode}>
            Complete another challenge
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

ExerciseSummary.propTypes = {
  startDate: PropTypes.object,
  wordsTyped: PropTypes.number,
  accuracy: PropTypes.number,
  refetch: PropTypes.func,
  restartChallengeMode: PropTypes.func,
};

export default ExerciseSummary;
