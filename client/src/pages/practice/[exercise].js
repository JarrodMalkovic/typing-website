import * as React from 'react';

import {
  Container,
  Stack,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';

import ExerciseContent from '../../modules/exercises/components/exercise-content';
import ExerciseSummary from '../../modules/exercises/components/exercise-summary';
import ProgressBar from '@ramonak/react-progress-bar';

// Just placeholder data, eventually an array of containing the questions for a parcticular exercise will be retrieved from the backend using an API request
const sampleExercise = [
  { words: 'test word' },
  { words: '마가' },
  { words: '저는 7년 동안' },
  { words: '저는 7년 동안 한국에서' },
  { words: '저는 7년 동안 한 살았어요' },
  { words: '저는 7년 동안 한국에서 살았어요저는 7년 동안 한국에서 살았어요' },
];

const getCompletionPercentage = (currentQuestionIndex, totalQuestions) =>
  Math.ceil((currentQuestionIndex / totalQuestions) * 100);

const Exercise = () => {
  const theme = useTheme();
  const [accuracy, setAccuracy] = React.useState(100);
  const [wordsTyped, setWordsTyped] = React.useState(0);
  const [startDate] = React.useState(new Date());
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  return (
    <Container pt="8" maxW="container.xl">
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
          sampleExercise.length,
        )}
      />
      <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={6}>
        {currentQuestionIndex >= sampleExercise.length ? (
          <ExerciseSummary
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            startDate={startDate}
            wordsTyped={wordsTyped}
            accuracy={accuracy}
          />
        ) : (
          <ExerciseContent
            sampleExercise={sampleExercise}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            startDate={startDate}
            wordsTyped={wordsTyped}
            setWordsTyped={setWordsTyped}
            accuracy={accuracy}
            setAccuracy={setAccuracy}
          />
        )}
      </Stack>
    </Container>
  );
};

export default Exercise;
