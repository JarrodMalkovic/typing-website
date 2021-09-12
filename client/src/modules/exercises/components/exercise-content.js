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
  Text,
  useColorModeValue,
  Image
} from '@chakra-ui/react';

import DisplayExerciseHelpModalButton from './display-exercise-help-modal-button';
import DisplayVirtualKeyboardButton from './display-virtual-keyboard-button';
import PropTypes from 'prop-types';
import { showTextDifference } from '../utils/show-text-difference';
import Timer from '../../../common/components/timer';
import WPM from './wpm';
import { calculateAccuracy } from '../utils/calculate-accuracy';

const ExerciseContent = ({
  setCurrentQuestionIndex,
  currentQuestionIndex,
  sampleExercise,
  startDate,
  wordsTyped,
  setWordsTyped,
  accuracy,
  setAccuracy,
}) => {
  const inputRef = React.useRef();

  const [word, setWord] = React.useState('');
  const [showVirtualKeyboard, setShowVirtualKeyboard] = React.useState(false);

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && currentQuestionIndex < sampleExercise.length) {
      event.preventDefault();

      const currentQuestionAccuracy = calculateAccuracy(
        word,
        sampleExercise[currentQuestionIndex].words,
      );

      setAccuracy(
        (
          (parseFloat(accuracy) * currentQuestionIndex +
            parseFloat(currentQuestionAccuracy)) /
          (currentQuestionIndex + 1)
        ).toFixed(2),
      );

      setCurrentQuestionIndex(currentQuestionIndex + 1);
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
        <Heading fontSize={'4xl'}>Type the following in Korean </Heading>
        <Text
          fontSize={'2xl'}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {showTextDifference(word, sampleExercise[currentQuestionIndex].words)}
        </Text>
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
        <Box position="relative">
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
              
                <Spacer />
              <ButtonGroup>
                <DisplayExerciseHelpModalButton inputRef={inputRef} />
                <DisplayVirtualKeyboardButton
                  setShowVirtualKeyboard={setShowVirtualKeyboard}
                  showVirtualKeyboard={showVirtualKeyboard}
                />
              </ButtonGroup>
            </HStack>
          </Flex>

          <HStack>

          {showVirtualKeyboard && (
            <Box paddingTop='8' maxW="container.lg" boxSize="150cm">
            <Image src='https://images.squarespace-cdn.com/content/v1/53290cd2e4b091b8426b546b/1464209884334-7JR5209WDZ6O9CE36DJC/korean+keyboard+QWERTY?format=1000w' />
          </Box>
          )}

          </HStack>
        </Box>
      </Center>
    </>
  );
};

ExerciseContent.propTypes = {
  sampleExercise: PropTypes.object,
  currentQuestionIndex: PropTypes.string,
  setCurrentQuestionIndex: PropTypes.function,
  startDate: PropTypes.object,
  wordsTyped: PropTypes.number,
  setWordsTyped: PropTypes.func,
  accuracy: PropTypes.number,
  setAccuracy: PropTypes.func,
};

export default ExerciseContent;
