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

// const sampleData = [
//   {
//     name: 'Letters',
//     img: '/images/Letters.png',
//     subExercises: [
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: true },
//       { name: 'test', slug: 'test', disabled: true },
//     ],
//   },
//   {
//     name: 'Syllables',
//     img: '/images/Syllable.png',
//     subExercises: [
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//     ],
//   },
//   {
//     name: 'Words',
//     img: '/images/Words.png',
//     subExercises: [
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//     ],
//   },
//   {
//     name: 'Short Sentences',
//     img: '/images/Short-Sentences.png',
//     subExercises: [
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//     ],
//   },
//   {
//     name: 'Long Sentences',
//     img: '/images/Long-Sentences.png',
//     subExercises: [
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//     ],
//   },
//   {
//     name: 'Diction',
//     img: '/images/Dictation.png',
//     subExercises: [
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//       { name: 'test', slug: 'test', disabled: false },
//     ],
//   },
// ];

import { exercises } from '../../common/contstants/exercises';

const Practice = () => {
  return (
    <Container pt="8" maxW="container.lg">
      <VStack spacing="8">
        <VStack>
          <Heading>Practice Mode</Heading>
        </VStack>
        <Wrap spacing="30px" justify="center" maxW="container.md">
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
    </Container>
  );
};

export default Practice;
