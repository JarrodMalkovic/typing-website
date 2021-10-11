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

import PropTypes from 'prop-types';
import { caculateWPM } from '../utils/calculate-wpm';
import { calculateTimeTaken } from '../utils/calculate-time-taken';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useMutation } from 'react-query';
import Link from 'next/link';
import { useSubexercises } from '../../subexercises/hooks/use-subexercises';
import Spinner from '../../../common/components/spinner';
import { displayErrors } from '../../../common/utils/display-errors';

const submitPracticeAttempt = async (exercise, body) => {
  const res = await axios.post(`${BASE_API_URL}/api/practice/attempt/`, {
    subexercise_slug: exercise,
    ...body,
  });

  return res.data;
};

const ExerciseSummary = ({
  startDate,
  wordsTyped,
  accuracy,
  subexercise,
  restart,
  exercise,
}) => {
  const { data: subexercises, isLoading } = useSubexercises(exercise);

  const [wpm] = React.useState(caculateWPM(startDate, wordsTyped));
  const [timeTaken] = React.useState(calculateTimeTaken(startDate, new Date()));
  const [score] = React.useState(wpm * (accuracy / 100));
  const [nextSubexercise, setNextSubexercise] = React.useState(null);

  const { mutate, isError, error } = useMutation(() =>
    submitPracticeAttempt(subexercise, {
      wpm,
      time_elapsed: timeTaken,
      score,
      accuracy,
    }),
  );

  React.useEffect(() => {
    localStorage.removeItem(`${subexercise}-accuracy`);
    localStorage.removeItem(`${subexercise}-words-typed`);
    localStorage.removeItem(`${subexercise}-current-question-index`);
    localStorage.removeItem(`${subexercise}-time-elapsed`);
  }, [subexercise]);

  React.useEffect(() => {
    mutate();
  }, []);

  React.useEffect(() => {
    if (!subexercises) {
      return;
    }

    const currentSubexerciseIdx = subexercises
      .map((subexercise) => subexercise.subexercise_slug)
      .indexOf(subexercise);

    if (currentSubexerciseIdx >= subexercises.length - 1) {
      return;
    }

    const nextSubexercise = subexercises[currentSubexerciseIdx + 1];
    setNextSubexercise(nextSubexercise.subexercise_slug);
  }, [isLoading]);

  return (
    <Box>
      <Stack align={'center'}>
        {isError && displayErrors(error)}
        <Heading>Woohoo! You finished the subexercise! 🥳</Heading>
        <Heading as="h2" size="md">
          Subexercise Summary
        </Heading>
        <HStack spacing="8">
          <Text>Speed: {wpm} WPM</Text>
          <Text>Accuracy: {accuracy}%</Text>
          <Text>Score: {(wpm * (accuracy / 100)).toFixed(2)}</Text>
          <Text>Time Taken: {timeTaken.toFixed(2)} seconds</Text>
        </HStack>
        <ButtonGroup>
          <Button size="sm" variant="ghost" onClick={restart}>
            Restart Exercise
          </Button>

          {isLoading ? (
            <Button size="sm">Loading next subexercise...</Button>
          ) : !nextSubexercise ? (
            <Link href="/practice">
              <Button size="sm">Back to practice page</Button>
            </Link>
          ) : (
            <Link href={`/practice/${exercise}/subexercise/${nextSubexercise}`}>
              <Button size="sm">Next Subexercise</Button>
            </Link>
          )}
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
