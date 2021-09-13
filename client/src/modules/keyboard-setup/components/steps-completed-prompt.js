import * as React from 'react';

import {
  Box,
  Heading,
  Input,
  Stack,
  Text,
  VStack, Button,
  useColorModeValue,
} from '@chakra-ui/react';

import Confetti from 'react-confetti';
import { HANGUL_REGEX } from '../../../common/contstants/hangul-regex';
import PropTypes from 'prop-types';

const StepsCompletedPrompt = ({ os }) => {
  const [isKoreanText, setIsKoreanText] = React.useState(null);

  const handleChange = event => {
    const lastKeyPressed = event.target.value[event.target.value.length - 1];

    lastKeyPressed
      ? setIsKoreanText(Boolean(lastKeyPressed.match(HANGUL_REGEX)))
      : setIsKoreanText(null);
  };
  // 노ㅕㅑㅗㅕㅜ
  return (
    <Box>
      <Confetti numberOfPieces={500} gravity={0.1} recycle={false} />
      <VStack>
        <Heading as='h2' size='md'>
          Woohoo! You have completed the keyboard setup instructions for {os} 🥳
        </Heading>
        {isKoreanText !== null ? (
          isKoreanText ? (
            <Text>
              Your keyboard is all setup! Have fun practicing your korean
              typing skills!
            </Text>
          ) : (
            <Text>
              Oh no! Looks like the was an error setting up your keyboard 😞
            </Text>
          )
        ) : (
          <Text>
            Type in the text box below to check your keyboard is setup properly!
          </Text>
        )}
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          w={{ base: 'sm', md: 'md' }}
          boxShadow={'lg'}
          paddingBottom={4}
          px={4}
          paddingTop={4}>
          <Stack spacing={4}>
            <Input onChange={handleChange} />
          </Stack>
        </Box>

        {
          isKoreanText &&
          <Button >
            <a href="/practice">

              Continue
            </a>
          </Button>
        }
      </VStack>
    </Box>
  );
};

StepsCompletedPrompt.propTypes = {
  os: PropTypes.string,
};

export default StepsCompletedPrompt;
