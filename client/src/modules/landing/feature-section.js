import * as React from 'react';

import {
  Image,
  useColorModeValue,
  Text,
  Container,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';

// Adapted from: https://chakra-templates.dev/templates/page-sections/features/simpleThreeColumns
const FeatureSection = ({ learnMoreRef }) => {
  return (
    <Container ref={learnMoreRef} pt="20" maxW="7xl">
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10}>
        <Stack textAlign={{ base: 'center', lg: 'justify' }}>
          <Image
            ml={{ base: 'auto', lg: '0' }}
            mr={{ base: 'auto', lg: '0' }}
            w="16"
            h="16"
            src="/images/challenge-small-icon.webp"
          />
          <Text fontWeight={600}>Who are we?</Text>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            KeyKorea is a student designed website to help you learn the Korean
            Keyboard. Wether you're just starting out, or want some extra
            practice, KeyKorea is the best place for you to learn! With an
            intuitive and easy to use interface, you'll be a master of the
            Korean Keybaord in no time!
          </Text>
        </Stack>
        <Stack textAlign={{ base: 'center', lg: 'justify' }}>
          <Image
            ml={{ base: 'auto', lg: '0' }}
            mr={{ base: 'auto', lg: '0' }}
            w="16"
            h="16"
            src="/images/practice-small-icon.webp"
          />
          <Text fontWeight={600}> Designed For Your Success</Text>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Everyone learns in different ways. For the first time in history, we
            can analyze how millions of people learn at once to create the most
            effective educational system possible and tailor it to each student.
            Our ultimate goal is to give everyone access to a private tutor
            experience through technology.
          </Text>
        </Stack>
        <Stack textAlign={{ base: 'center', lg: 'justify' }}>
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
            Either in our chill practice mode, or our challenge mode, where you
            can compete against other students on a global leaderboard!
          </Text>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default FeatureSection;
