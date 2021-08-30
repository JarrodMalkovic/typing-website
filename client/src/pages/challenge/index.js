import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Text,
  Button,
  useColorModeValue,
  ButtonGroup,
} from '@chakra-ui/react';

import NextLink from 'next/link';

const Challenge = () => {
  return (
    <Container pt="8" maxW="container.md">
      <VStack spacing={8}>
        <VStack>
          <Heading>Challenge Mode</Heading>
          <Text
            fontSize="lg"
            align="center"
            color={useColorModeValue('gray.600', 'gray.200')}>
            This mode puts your korean typing skills to the ultimate test!
            Challenge Mode tests all your skills, containing exercises on
            Letters, Sylabbles, Words, Short Sentances, Long Sentances and
            Diction!
          </Text>
        </VStack>
        <ButtonGroup>
          <Button size="sm" bgColor="blue.400" color="white">
            Start Challenge
          </Button>
          <NextLink href="/practice">
            <Button size="sm" variant="ghost">
              I need some practice first
            </Button>
          </NextLink>
        </ButtonGroup>
      </VStack>
    </Container>
  );
};

export default Challenge;
