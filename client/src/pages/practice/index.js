import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Text,
  Wrap,
  Image,
  Center,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

import Link from 'next/link';
import PracticeExerciseButton from '../../modules/practice/practice-exercise-button';
import { useExercises } from '../../modules/exercises/hooks/use-exercises';
import { useUnauthorizedRedirect } from '../../modules/auth/hooks/use-unauthorized-redirect';
import Spinner from '../../common/components/spinner';
import { useTitle } from 'react-use';

const Practice = () => {
  const { isLoading: isAuthLoading } = useUnauthorizedRedirect('/auth/sign-in');
  const { data: exercises, isLoading } = useExercises();
  useTitle('KeyKorea - Practice Mode');

  if (isAuthLoading) {
    return <Spinner />;
  }

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
        {isLoading ? (
          <Spinner />
        ) : (
          <Wrap
            spacing="30px"
            justify="center"
            maxW="container.md"
            position="absolute"
            top={40}>
            {Object.entries(exercises).map(([key, value], idx) => (
              <PracticeExerciseButton
                key={value.exercise_slug}
                name={value.exercise_name}
                slug={value.exercise_slug}
                description={value.description}
                img={value.image}
              />
            ))}
          </Wrap>
        )}
      </VStack>
    </Box>
  );
};

export default Practice;
