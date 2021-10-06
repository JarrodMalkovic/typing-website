import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Text,
  Wrap,
  Image,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

import Link from 'next/link';
import PracticeExerciseButton from '../../modules/practice/practice-exercise-button';
import { exercises } from '../../common/contstants/exercises';

const Practice = () => {
  return (
    <Box position="relative">
      <VStack spacing={5} width="100%">
        <Image
          minW="full"
          opacity="30%"
          linear-gradient="(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25))"
          src="/images/Basic.png"
        />
        <Heading fontSize="45px" padding="20px" position="absolute" top={0}>
          Practice Mode
        </Heading>
        

        <VStack position="absolute" top={20}>
          <Text
            fontSize="20px"
            color={useColorModeValue('gray.600', 'gray.200')}>
            Choose Your Path!
          </Text>
        </VStack>
        <Wrap
          spacing="30px"
          justify="center"
          maxW="container.md"
          position="absolute"
          top={40}>
          {Object.entries(exercises).map(([key, value], idx) => (
            <PracticeExerciseButton
              key={value.name}
              name={value.name}
              slug={value.slug}
              img={value.img}
            />
          ))}
        </Wrap>
      </VStack>
    </Box>
  );
};

export default Practice;
