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
    dscrpt: 'Practice your korean letters on the keyboard!',
    subExercises: [
      { name: 'Left Hand', slug: 'test', disabled: false, description: "Practice your consonants!"},
      { name: 'Right Hand', slug: 'test', disabled: false, description: "Practice your vowels!"},
      { name: 'Right + Left Hand', slug: 'test', disabled: false, description: "Practice both your consonants and vowels!" },
      { name: 'Shift + Right Hand', slug: 'test', disabled: true , description: "Practice your double consonants!"},
      { name: 'Shift + Left Hand', slug: 'test', disabled: true, description: "Practice your double vowels!"},
      { name: 'Complete', slug: 'test', disabled: true, description: "Put all your knowledge of the Korean Letters to the test!"},
    ],
  },
  {
    name: 'Syllables',
    img: '/images/Syllable.png',
    subExercises: [
      { name: 'C + V', slug: 'test', disabled: false },
      { name: 'Shift C + V', slug: 'test', disabled: false },
      { name: 'C + V + C', slug: 'test', disabled: false },
      { name: 'Shift C + V + C', slug: 'test', disabled: false },
      { name: 'C + V + CC', slug: 'test', disabled: false },
    ],
  },
  {
    name: 'Words',
    img: '/images/Words.png',
    subExercises: [
      { name: '2 Syllables With Ending Consonant', slug: 'test', disabled: false },
      { name: '2 Syllables Without Ending Consonant', slug: 'test', disabled: false },
      { name: '3 Syllables With Ending Consonant', slug: 'test', disabled: false },
      { name: '3 Syllables Without Ending Consonant', slug: 'test', disabled: false },
      { name: 'Longer than 3 syllables', slug: 'test', disabled: false },
    ],
  },
  {
    name: 'Short Sentences',
    img: '/images/Short-Sentences.png',
    subExercises: [
      { name: 'Complete', slug: 'test', disabled: false }
    ],
  },
  {
    name: 'Long Sentences',
    img: '/images/Long-Sentences.png',
    subExercises: [
      { name: 'Complete', slug: 'test', disabled: false }
    ],
  },
  {
    name: 'Diction',
    img: '/images/Dictation.png',
    dscrpt: 'Description',
    subExercises: [
      { name: 'Word Dictation', slug: 'test', disabled: false },
      { name: 'Short Sentence Dictation', slug: 'test', disabled: false },
      { name: 'Long Sentence Dictation', slug: 'test', disabled: false },
      
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
