import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Text,
  Wrap,
  WrapItem,
  Button,
  Image,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

import Link from 'next/link';
import PracticeExerciseButton from '../../modules/practice/practice-exercise-button';

const sampleData = [
  {
    name: 'Letters',
    subExercises: [
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: true },
      { name: 'test', slug: 'test', disabled: true },
    ],
  },
  {
    name: 'Syllables',
    subExercises: [
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
    ],
  },
  {
    name: 'Words',
    subExercises: [
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
    ],
  },
  {
    name: 'Short Sentences',
    subExercises: [
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
    ],
  },
  {
    name: 'Long Sentences',
    subExercises: [
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
    ],
  },
  {
    name: 'Diction',
    subExercises: [
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
      { name: 'test', slug: 'test', disabled: false },
    ],
  },
];

const Practice = () => {
  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={8}>
        <VStack>
          <Heading>Practice Mode</Heading>
          <Text
            fontSize={'lg'}
            color={useColorModeValue('gray.600', 'gray.200')}>
            Choose Your Path!
          </Text>
        </VStack>
        <Wrap spacing={8} justify="center" maxW="container.md">
          {sampleData.map((data) => (
            <PracticeExerciseButton
              key={data.name}
              name={data.name}
              subExercises={data.subExercises}
            />
          ))}
        </Wrap>
      </VStack>
    </Container>
  );
};

export default Practice;
