import * as React from 'react';

import {
  Container,
  Stack,
  useColorModeValue,
  useTheme,
  Heading,
} from '@chakra-ui/react';

import ExerciseContent from '../../modules/exercises/components/exercise-content';
import ExerciseSummary from '../../modules/exercises/components/exercise-summary';
import ProgressBar from '@ramonak/react-progress-bar';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';

const getCompletionPercentage = (currentQuestionIndex, totalQuestions) =>
  Math.ceil((currentQuestionIndex / totalQuestions) * 100);

const getInitialAccuracy = (exercise) =>
  localStorage.getItem(`${exercise}-accuracy`) * 1 || 100;

const getInitialWordsTyped = (exercise) =>
  localStorage.getItem(`${exercise}-words-typed`) * 1 || 0;

const getInitialDate = (exercise) => {
  const now = new Date();
  const timeElapsed = localStorage.getItem(`${exercise}-time-elapsed`) * 1;
  console.log(timeElapsed);
  return timeElapsed >= 0 ? new Date(now.getTime() - timeElapsed) : now;
};

const getCurrentQuestionIndex = (exercise) =>
  localStorage.getItem(`${exercise}-current-question-index`) * 1 || 0;

const getQuestions = async (exercise) => {
  const res = await axios.get(
    `${BASE_API_URL}/api/questions/subexercise/${exercise}/`,
  );
  return res.data;
};

const Exercise = () => {
  const theme = useTheme();
  const router = useRouter();
  const { exercise } = router.query;
  const { data, isLoading, isError } = useQuery(exercise, () =>
    getQuestions(exercise),
  );
  const [accuracy, setAccuracy] = React.useState(100);
  const [wordsTyped, setWordsTyped] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  React.useEffect(() => {
    if (!exercise) {
      return;
    }

    setAccuracy(getInitialAccuracy(exercise));
    setWordsTyped(getInitialWordsTyped(exercise));
    setStartDate(getInitialDate(exercise));
    setCurrentQuestionIndex(getCurrentQuestionIndex(exercise));
  }, [exercise]);

  if (isError) {
    return <Heading>An error occured</Heading>;
  }

  const restart = () => {
    setAccuracy(100);
    setWordsTyped(0);
    setStartDate(new Date());
    setCurrentQuestionIndex(0);
  };

  return (
    <Container pt="8" maxW="container.xl">
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <ProgressBar
            bgColor={theme.colors.blue['400']}
            baseBgColor={useColorModeValue(
              theme.colors.gray['200'],
              theme.colors.gray['700'],
            )}
            labelColor={useColorModeValue(
              theme.colors.gray['700'],
              theme.colors.gray['200'],
            )}
            completed={getCompletionPercentage(
              currentQuestionIndex,
              data.length,
            )}
          />
          <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={6}>
            {currentQuestionIndex >= data.length ? (
              <ExerciseSummary
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                startDate={startDate}
                wordsTyped={wordsTyped}
                accuracy={accuracy}
                exercise={exercise}
                restart={restart}
              />
            ) : (
              <ExerciseContent
                questions={data}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                currentQuestionIndex={currentQuestionIndex}
                startDate={startDate}
                wordsTyped={wordsTyped}
                setWordsTyped={setWordsTyped}
                accuracy={accuracy}
                exercise={exercise}
                setAccuracy={setAccuracy}
              />
            )}
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Exercise;
