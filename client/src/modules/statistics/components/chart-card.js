import * as React from 'react';

import {
  Box,
  useTheme,
  Text,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const ChartCard = ({ dataKey, data, name }) => {
  const theme = useTheme();

  return (
    <Box
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded="md"
      padding="4">
      <Box width={'100%'} height={'300px'}>
        <ResponsiveContainer>
          <LineChart width={500} height={200} data={data}>
            <XAxis dataKey="date" />
            <Tooltip />
            <Line
              name={name}
              label={false}
              type="monotone"
              dataKey={dataKey}
              stroke={theme.colors.blue['400']}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Center>
        <Text> All Time Average {name} </Text>
      </Center>
    </Box>
  );
};

export default ChartCard;
