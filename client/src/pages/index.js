import * as React from 'react';

import {
  Image,
  Box,
  useColorModeValue,
  Text,
  Button,
  Heading,
  Container,
  SimpleGrid,
  Stack,
  Link,
  Flex,
  chakra,
  ButtonGroup,
  HStack,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '../modules/auth/hooks/use-auth';
import { useTitle } from 'react-use';
import ProgressiveImage from 'react-progressive-image';

const Home = () => {
  useTitle('KeyKorea');

  const { state } = useAuth();
  const learnMoreRef = React.useRef();

  return (
    <>
      <Box
        px={4}
        position="relative"
        paddingBottom={{ base: '20', lg: '40' }}
        paddingTop={{ base: '20', lg: '40' }}
        backgroundColor={useColorModeValue('gray.100', '#1c232e')}>
        <Container maxW="container.xl">
          <Box
            textAlign={{ base: 'center', lg: 'left' }}
            maxW={{ base: '100%', lg: '50%' }}>
            <Heading size="2xl">
              Learn how to use the <Box as="span">Korean Keyboard</Box>
            </Heading>
            <Text
              pt="4"
              fontSize="xl"
              color={useColorModeValue('gray.600', 'gray.300')}>
              Placeholder Subheading Placeholder Subheading Placeholder
              Subheading Placeholder Subheading Placeholder Subheading
              Placeholder Subheading Placeholder Placeholder{' '}
            </Text>
            <ButtonGroup pt="4">
              <NextLink
                href={
                  state && state.isAuthenticated
                    ? '/get-started'
                    : '/auth/sign-in'
                }>
                <a>
                  <Button
                    color="white"
                    backgroundColor="blue.400"
                    variant="solid"
                    _hover={{
                      backgroundColor: 'blue.500',
                    }}>
                    Get Started
                  </Button>
                </a>
              </NextLink>
              <Button
                onClick={() =>
                  window.scrollTo({
                    behavior: 'smooth',
                    top: learnMoreRef.current.offsetTop,
                  })
                }>
                Learn More
              </Button>
            </ButtonGroup>
          </Box>
        </Container>
        <Box
          visibility={{ base: 'hidden', lg: 'visible' }}
          width="50%"
          position="absolute"
          height="full"
          right="0px"
          bottom="0px"
          top="0px"
          clipPath="polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)">
          <Image
            as={ProgressiveImage}
            height="100%"
            width="100%"
            objectFit="cover"
            placeholder={useColorModeValue(
              './images/korea-day-small.webp',
              './images/korea-night-small.webp',
            )}
            src={useColorModeValue(
              './images/korea-day.webp',
              './images/korea-night.webp',
            )}>
            {(src, loading) => (
              <Image
                style={{ filter: loading ? 'blur(5px)' : '' }}
                height="100%"
                width="100%"
                objectFit="cover"
                src={src}
              />
            )}
          </Image>
        </Box>
      </Box>
      <Container ref={learnMoreRef} pt="20" maxW="7xl">
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10}>
          <Stack textAlign={{ base: 'center', lg: 'left' }}>
            <Image
              ml={{ base: 'auto', lg: '0' }}
              mr={{ base: 'auto', lg: '0' }}
              w="16"
              h="16"
              src="/images/challenge-small-icon.webp"
            />
            <Text fontWeight={600}>Who are we?</Text>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              KeyKorea is a student designed website to help you learn the
              Korean Keyboard. Wether you're just starting out, or want some
              extra practice, KeyKorea is the best place for you to learn! With
              an intuitive and easy to use interface, you'll be a master of the
              Korean Keybaord in no time!
            </Text>
          </Stack>
          <Stack textAlign={{ base: 'center', lg: 'left' }}>
            <Image
              ml={{ base: 'auto', lg: '0' }}
              mr={{ base: 'auto', lg: '0' }}
              w="16"
              h="16"
              src="/images/practice-small-icon.webp"
            />
            <Text fontWeight={600}> Designed For Your Success</Text>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              Everyone learns in different ways. For the first time in history,
              we can analyze how millions of people learn at once to create the
              most effective educational system possible and tailor it to each
              student. Our ultimate goal is to give everyone access to a private
              tutor experience through technology.
            </Text>
          </Stack>
          <Stack textAlign={{ base: 'center', lg: 'left' }}>
            <Image
              ml={{ base: 'auto', lg: '0' }}
              mr={{ base: 'auto', lg: '0' }}
              w="16"
              h="16"
              src="/images/keyboard-small-icon.webp"
            />
            <Text fontWeight={600}> Enhance Your Korean Typing Skills</Text>
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              A passion for learning is the heart of everything we do. KeyKorea
              allows you to work through examples directly set by your lecturer!
              Either in our chill practice mode, or our challenge mode, where
              you can compete against other students on a global leaderboard!
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Home;
