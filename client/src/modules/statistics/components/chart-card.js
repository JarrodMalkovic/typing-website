import * as React from 'react';

import {
  Box,
  useTheme,
  Text,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

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

const ChartCard = () => {
  const theme = useTheme();

  return (
    <Box
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded="md"
      padding="4">
      <Box width={'100%'} height={'300px'}>
        <ResponsiveContainer>
          <LineChart width={500} height={200} data={sampleData}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Line
              label={false}
              type="monotone"
              dataKey="score"
              stroke={theme.colors.blue['400']}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Center>
        <Text> All time average WPM </Text>
      </Center>
    </Box>
  );
};

export default ChartCard;
