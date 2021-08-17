import * as React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  Stack,
  Text,
  useTheme,
} from '@chakra-ui/react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import Confetti from 'react-confetti';
import PropTypes from 'prop-types';

const sampleData = [
  {
    name: '12/3/2021',
    score: 2400,
    amt: 2400,
  },
  {
    name: '12/3/2021',
    score: 1398,
    amt: 2210,
  },
  {
    name: '12/3/2021',
    score: 9800,
    amt: 2290,
  },
  {
    name: '12/3/2021',
    score: 3908,
    amt: 2000,
  },
  {
    name: '12/3/2021',
    score: 4800,
    amt: 2181,
  },
  {
    name: '12/3/2021',
    score: 3800,
    amt: 2500,
  },
  {
    name: '12/3/2021',
    score: 4300,
    amt: 2100,
  },
];

const ExerciseSummary = ({ setCurrentQuestionIndex }) => {
  const theme = useTheme();

  return (
    <Box>
      <Confetti numberOfPieces={500} gravity={0.1} recycle={false} />
      <Stack align={'center'}>
        <Heading>Woohoo! You finished the exercise! 🥳</Heading>
        <Heading as='h2' size='md'>
          Exercise Summary
        </Heading>
        <HStack spacing='8'>
          <Text>Speed: 99 WPM</Text>
          <Text>Accuracy: 20%</Text>
          <Text>Score: 32</Text>
          <Text>Time Taken: 1:32</Text>
        </HStack>
        <Heading as='h2' size='md'>
          Previous Attempts
        </Heading>
        <Box width={500} height={300}>
          <ResponsiveContainer width={500} height={300}>
            <LineChart width={500} height={300} data={sampleData}>
              <XAxis dataKey='name' />
              <Tooltip />
              <Line
                label={false}
                type='monotone'
                dataKey='score'
                stroke={theme.colors.blue['400']}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <ButtonGroup>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => setCurrentQuestionIndex(0)}>
            Restart Exercise
          </Button>
          <Button size='sm'>Next Exercise</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

ExerciseSummary.propTypes = {
  setCurrentQuestionIndex: PropTypes.func,
};

export default ExerciseSummary;
