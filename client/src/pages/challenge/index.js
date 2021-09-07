import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Text,
  Button,
  useColorModeValue,
  ButtonGroup,
  Image,
  Box,
} from '@chakra-ui/react';

import NextLink from 'next/link';

const Challenge = () => {
  return (
    <Box position="relative">
      <VStack spacing={5} width="100%">
        <Image
          minW="full"
          opacity="30%"
          linear-gradient="(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25))"
          src="/images/Basic.png"
        />
        <Heading position="absolute" top={0}>
          Challenge Mode
        </Heading>
        <Text
          fontSize="lg"
          top={20}
          align="center"
          position="absolute"
          color={useColorModeValue('gray.600', 'gray.200')}
          maxW="container.md">
          This mode puts your korean typing skills to the ultimate test!
          Challenge Mode tests all your skills, containing exercises on Letters,
          Sylabbles, Words, Short Sentances, Long Sentances and Diction!{' '}
          <br></br>You can track how you go, and enter a leaderboard with your
          other peers! <br></br>Good Luck!
        </Text>
        <ButtonGroup position="absolute" top={80}>
          <Button
            size="sm"
            variant="ghost"
            bgColor="rgba(200,16,46,0.7)"
            _hover={{
              bg: 'rgba(0,47,108,0.7)',
            }}
            color="white">
            Start Challenge
          </Button>
          <NextLink href="/practice">
            <Button
              size="sm"
              variant="ghost"
              bgColor="rgba(200,16,46,0.7)"
              _hover={{
                bg: 'rgba(0,47,108,0.7)',
              }}
              color="white">
              I need some practice first
            </Button>
          </NextLink>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default Challenge;
