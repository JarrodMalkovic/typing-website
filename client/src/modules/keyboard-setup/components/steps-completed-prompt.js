import * as React from 'react';

import {
  Box,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Button,
  Container,
  Link,
} from '@chakra-ui/react';

import { HANGUL_REGEX } from '../../../common/contstants/hangul-regex';
import PropTypes from 'prop-types';

const StepsCompletedPrompt = ({ os }) => {
  const [isKoreanText, setIsKoreanText] = React.useState(null);

  const handleChange = (event) => {
    const lastKeyPressed = event.target.value[event.target.value.length - 1];

    lastKeyPressed
      ? setIsKoreanText(Boolean(lastKeyPressed.match(HANGUL_REGEX)))
      : setIsKoreanText(null);
  };

  return (
    <Box pt="8">
      <VStack>
        <Heading textAlign="center" as="h2" size="md">
          Well done! You have completed the keyboard setup instructions for {os}
          !
        </Heading>
        {isKoreanText !== null ? (
          isKoreanText ? (
            <Text color="blue.400">
              Everything looks setup correctly! Have fun practicing your korean
              typing skills!
            </Text>
          ) : (
            <Text textAlign="center" color="red.400">
              Oh no! You are not typing in Hangul. Ensure that your keyboard is
              setup in Korean.
            </Text>
          )
        ) : (
          <Text textAlign="center">
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
        {isKoreanText !== null && isKoreanText ? (
          <Link href="/practice">
            <Button variant="ghost" mt="4">
              Continue to Practice!
            </Button>
          </Link>
        ) : null}
      </VStack>
    </Box>
  );
};

StepsCompletedPrompt.propTypes = {
  os: PropTypes.string,
};

export default StepsCompletedPrompt;
