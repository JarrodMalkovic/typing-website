import * as React from 'react';

import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  Spacer,
  Stack,
  VStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import DisplayExerciseHelpModalButton from './display-exercise-help-modal-button';
import DisplayVirtualKeyboardButton from './display-virtual-keyboard-button';
import PropTypes from 'prop-types';
import { showTextDifference } from '../utils/show-text-difference';
import Timer from '../../../common/components/timer';
import WPM from './wpm';
import { calculateAccuracy } from '../utils/calculate-accuracy';
import VirtualKeyboard from './virtual-keyboard';

const ExerciseContent = ({
  setCurrentQuestionIndex,
  currentQuestionIndex,
  questions,
  startDate,
  wordsTyped,
  setWordsTyped,
  accuracy,
  exercise,
  setAccuracy,
}) => {
  const inputRef = React.useRef();
  const [word, setWord] = React.useState('');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = React.useState(false);
  const [skipRender, setSkipRender] = React.useState(true);

  React.useEffect(() => {
    if (skipRender) {
      return setSkipRender(false);
    }

    if (!exercise) {
      return;
    }

    localStorage.setItem(`${exercise}-accuracy`, accuracy);
    localStorage.setItem(`${exercise}-words-typed`, wordsTyped);
    localStorage.setItem(
      `${exercise}-current-question-index`,
      currentQuestionIndex,
    );
    localStorage.setItem(`${exercise}-time-elapsed`, new Date() - startDate);
  }, [currentQuestionIndex, accuracy, wordsTyped]);

  React.useEffect(() => {
    if (skipRender) {
      return;
    }

    const interval = setInterval(() => {
      localStorage.setItem(`${exercise}-time-elapsed`, new Date() - startDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [skipRender]);

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && currentQuestionIndex < questions.length) {
      event.preventDefault();

      const currentQuestionAccuracy = calculateAccuracy(
        word,
        questions[currentQuestionIndex].question,
      );

      setAccuracy(
        (
          (parseFloat(accuracy) * currentQuestionIndex +
            parseFloat(currentQuestionAccuracy)) /
          (currentQuestionIndex + 1)
        ).toFixed(2),
      );

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setWordsTyped(wordsTyped + 1);
      setWord('');
    }

    if (event.key === ' ') {
      setWordsTyped(wordsTyped + 1);
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Stack align={'center'}>
        {questions[currentQuestionIndex].audio_url ? (
          <Center>
            <VStack>
              <Heading textAlign="center" fontSize={'4xl'}>
                Type the what you hear in Korean
              </Heading>{' '}
              <audio
                autoPlay
                controls="controls"
                src={questions[currentQuestionIndex].audio_url}
              />
              <Text
                fontSize={'sm'}
                color={useColorModeValue('gray.600', 'gray.200')}>
                ({questions[currentQuestionIndex].translation})
              </Text>
            </VStack>
          </Center>
        ) : (
          <>
            <Center>
              <Heading textAlign="center" fontSize={'4xl'}>
                Type the following in Korean
              </Heading>
            </Center>
            <Text
              fontSize={'2xl'}
              color={useColorModeValue('gray.600', 'gray.200')}>
              {showTextDifference(
                word,
                questions[currentQuestionIndex].question,
              )}
            </Text>
            <Text
              fontSize={'sm'}
              color={useColorModeValue('gray.600', 'gray.200')}>
              ({questions[currentQuestionIndex].translation})
            </Text>
          </>
        )}
      </Stack>
      <Center>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          w={{ base: 'sm', md: 'md' }}
          boxShadow={'lg'}
          p={4}>
          <Stack spacing={4}>
            <Input
              ref={inputRef}
              onKeyDown={handleKeyDown}
              value={word}
              onChange={handleChange}
              onPaste={handlePaste}
            />
          </Stack>
        </Box>
      </Center>
      <Center>
        <Box w={{ base: 'sm', md: 'md' }}>
          <Flex>
            <HStack spacing={'8'}>
              <Text
                fontSize={'sm'}
                color={useColorModeValue('gray.600', 'gray.200')}>
                WPM: <WPM startDate={startDate} wordsTyped={wordsTyped} />
              </Text>
              <Text
                fontSize={'sm'}
                color={useColorModeValue('gray.600', 'gray.200')}>
                Accuracy: {accuracy}%
              </Text>
              <Text
                fontSize={'sm'}
                color={useColorModeValue('gray.600', 'gray.200')}>
                Elapsed: <Timer startDate={startDate} />
              </Text>
            </HStack>
            <Spacer />
            <ButtonGroup>
              <DisplayExerciseHelpModalButton inputRef={inputRef} />
              <DisplayVirtualKeyboardButton
                setShowVirtualKeyboard={setShowVirtualKeyboard}
                showVirtualKeyboard={showVirtualKeyboard}
              />
            </ButtonGroup>
          </Flex>
        </Box>
      </Center>
      {showVirtualKeyboard && <VirtualKeyboard inputRef={inputRef} />}
    </>
  );
};

ExerciseContent.propTypes = {
  questions: PropTypes.object,
  currentQuestionIndex: PropTypes.string,
  setCurrentQuestionIndex: PropTypes.function,
  startDate: PropTypes.object,
  wordsTyped: PropTypes.number,
  setWordsTyped: PropTypes.func,
  accuracy: PropTypes.number,
  setAccuracy: PropTypes.func,
  exercise: PropTypes.func,
};

export default ExerciseContent;
