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
          <Text fontWeight={600}>Who We Are</Text>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            KeyKorea is a website ideated by Dr Nicola Fraschini and created by computer science students
            Jarrod Malkovic, Anders Christensen, Diana Nik Suzaimi, Anoushka Singh, 
            Matthew Walsh and Ziwen Li at the University of Western Australia.
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
            KeyKorea is designed to help you learning typing in Korean. It is 
            has been thought for learners of Korean as a foreign language, and 
            it is structured with practice exercises of increasing difficulty to 
            help you become a master of the Korean keyboard. All of the words and sentences 
            are at the level of beginner or intermediate learner of Korean and appears 
            with their English translation, so you can also improve your Korean while 
            learning how to type it!
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
          <Text fontWeight={600}>Enhance Your Korean Typing Skills</Text>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            You can select the practice mode if you think that you need to do 
            some more practice. Once you feel confident, you can attempt the challenge
            mode to check your progress and compare your score with other students.
          </Text>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default FeatureSection;
