import * as React from 'react';

import { Box, useColorModeValue, useTheme } from '@chakra-ui/react';

const showTextDifference = (word, target) => {
  const theme = useTheme();
  const targetCharacters = target.split('');

  let isError = false;

  return targetCharacters.map((char, idx) => {
    if (idx < word.length && word[idx] !== char) {
      isError = true;
    }

    if (isError && idx >= word.length) {
      return (
        <Box
          key={idx}
          as='span'
          textDecoration={idx === word.length ? 'underline' : null}>
          {char}
        </Box>
      );
    }

    if (isError) {
      return (
        <Box
          key={idx}
          as='span'
          color={useColorModeValue(
            theme.colors.red['500'],
            theme.colors.red['400'],
          )}
          textDecoration={'underline'}>
          {char}
        </Box>
      );
    }

    if (idx >= word.length) {
      return (
        <Box
          key={idx}
          as='span'
          textDecoration={idx === word.length ? 'underline' : null}>
          {char}
        </Box>
      );
    }

    return (
      <Box
        key={idx}
        as='span'
        color={useColorModeValue(
          theme.colors.green['500'],
          theme.colors.green['400'],
        )}
        textDecoration={idx === word.length ? 'underline' : null}>
        {char}
      </Box>
    );
  });
};

export { showTextDifference };
