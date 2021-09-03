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
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

import Link from 'next/link';
import PracticeExerciseButton from '../../modules/practice/practice-exercise-button';

const sampleData = [
  {
    name: 'Letters',
    img: '/images/Letters.png',
    dscrpt: 'Description',
    subExercises: [
      { name: 'Left Hand', slug: 'test', disabled: false, description: "Practice your consonants!"},
      { name: 'Right Hand', slug: 'test', disabled: false },
      { name: 'Right + Left Hands', slug: 'test', disabled: false },
      { name: 'Shift + Right hands', slug: 'test', disabled: true },
      { name: 'Shift + Left hands', slug: 'test', disabled: true },
      { name: 'Complete', slug: 'test', disabled: true },
    ],
  },
  {
    name: 'Syllables',
    img: '/images/Syllable.png',
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
    img: '/images/Words.png',
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
    img: '/images/Short-Sentences.png',
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
    img: '/images/Long-Sentences.png',
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
    img: '/images/Dictation.png',
    dscrpt: 'Hi There',
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
    <Container mt = "50px" maxW="container.lg" centerContent>
      <VStack>
        <VStack>
          <Heading fontSize = "45px" padding = "20px">
            Practice Mode
          </Heading>
        </VStack>

        <Divider/>

        <VStack>
          <Text
            fontSize= "20px"
            color={useColorModeValue('gray.600', 'gray.200')}>
            Choose Your Path!
          </Text>
        </VStack>
        <Wrap spacing="30px" justify="center" maxW="container.md">
          {sampleData.map((data) => (
            <PracticeExerciseButton
              key={data.name}
              name={data.name}
              img = {data.img}
              description = {data.description}
              dscrpt = {data.dscrpt}
              subExercises={data.subExercises}
            />
          ))}
        </Wrap>
        </VStack>
      
    </Container>
  );
};

export default Practice;
