import * as React from 'react';

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  useColorModeValue,
  StatHelpText,
  StatNumber,
  useRadio,
} from '@chakra-ui/react';

const StatsCard = ({ title, stat, time, ...rest }) => {
  return (
    <Box
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'lg'}>
      <Stat px={{ base: 2, md: 4 }} py="2" pt="4">
        <Box>
          <StatLabel isTruncated>{title}</StatLabel>
          <StatNumber>{stat}</StatNumber>
          <StatHelpText>{time}</StatHelpText>
        </Box>
      </Stat>
    </Box>
  );
};

export default StatsCard;
