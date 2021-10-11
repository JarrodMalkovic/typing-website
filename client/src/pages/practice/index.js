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
    <Container pt="8" maxW="container.xl">
      <VStack spacing={5} width="100%">
        <VStack spacing="1">
          <Heading textAlign="center" fontSize="45px">
            Practice Mode
          </Heading>

          <Text
            textAlign="center"
            fontSize="20px"
            color={useColorModeValue('gray.600', 'gray.200')}>
            Choose Your Path!
          </Text>
        </VStack>

        {isLoading || !exercises ? (
          <Spinner />
        ) : (
          <Wrap spacing="30px" justify="center" maxW="container.md" top={40}>
            {Object.entries(exercises).map(([key, value]) => (
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
    </Container>
  );
};

export default Practice;
