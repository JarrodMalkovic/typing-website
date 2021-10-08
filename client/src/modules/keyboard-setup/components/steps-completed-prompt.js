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
    <Box>
      <VStack>
        <Heading as="h2" size="md"  position="relative" top="200px">
          Well done! You have completed the keyboard setup instructions for {os}!
        </Heading>
        {isKoreanText !== null ? (
          isKoreanText ? (
            <Container>
              <Text position="relative" top="200px" color = "#39aae1" fontWeight ="medium">
                Everything looks setup correctly! Have fun practicing your
                korean typing skills!
              </Text>
              <Link href="/practice">
                <Button
                  top="400px"
                  left="45vw"
                  right="45vw"
                  position="absolute">
                  Continue to Practice!
                </Button>
              </Link>
            </Container>
          ) : (
            <Text position="relative" top="200px" color = "#f52d56" fontWeight ="medium">
            Oh no! You are not typing in Hangul.Ensure that your keyboard is setup in Korean.
            </Text>
          )
        ) : (
          <Text position="relative" top="200px">
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
          paddingTop={4}
          position="relative"
          top="200px">
          <Stack spacing={4}>
            <Input onChange={handleChange} />
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
};

StepsCompletedPrompt.propTypes = {
  os: PropTypes.string,
};

export default StepsCompletedPrompt;
