import * as React from 'react';
import * as Hangul from 'hangul-js';

import { Box, useColorModeValue, useTheme } from '@chakra-ui/react';

const english = /^[A-Za-z0-9]*$/;

const isError = (idx, currentIdx) => idx <= currentIdx;

const isUntyped = (idx, finishIdx) => idx > finishIdx;

const isCorrect = (idx, startIdx, finishIdx) =>
  idx >= startIdx && idx <= finishIdx;

const isCorrectAndComplete = (idx, startIdx, finishIdx, word, currentIdx) =>
  idx >= startIdx &&
  idx <= finishIdx &&
  (Hangul.isComplete(word[idx]) || english.test(word[idx]) || idx < currentIdx);

const calculateTextDifference = (
  startIdx,
  finishIdx,
  currentIdx,
  word,
  typed,
) => {
  const theme = useTheme();

  if (!word || !word.length) {
    return null;
  }

  return word.split('').map((char, idx, chars) => {
    const currWord = chars.slice(0, Math.min(idx + 1, currentIdx));

    if (
      isCorrect(idx, startIdx, finishIdx) &&
      (Hangul.search(currWord.join(''), typed) >= 0 ||
        currWord.join('').length <= typed.length)
    ) {
      return (
        <Box
          key={idx}
          as="span"
          color={useColorModeValue(
            theme.colors.green['500'],
            theme.colors.green['400'],
          )}
          textDecoration={idx === currentIdx + 1 ? 'underline' : null}>
          {char}
        </Box>
      );
    }

    if (isError(idx, currentIdx)) {
      return (
        <Box
          key={idx}
          as="span"
          color={useColorModeValue(
            theme.colors.red['500'],
            theme.colors.red['400'],
          )}
          textDecoration={'underline'}>
          {char}
        </Box>
      );
    }

    if (isUntyped(idx, finishIdx)) {
      return (
        <Box
          key={idx}
          as="span"
          textDecoration={idx === currentIdx + 1 ? 'underline' : null}>
          {char}
        </Box>
      );
    }
  });
};

const showTextDifference = (word, target) => {
  let currentIdx = Math.min(target.length, word.length) - 1;
  let prevTriedIdx = -1;

  while (currentIdx >= 0) {
    const ranges = Hangul.rangeSearch(target, word.slice(0, currentIdx + 1));

    if (!ranges.length) {
      prevTriedIdx = currentIdx;
      currentIdx--;
      continue;
    }

    const [startIdx, finishIdx] = ranges.shift();

    if (startIdx !== 0) {
      prevTriedIdx = currentIdx;
      currentIdx--;
      continue;
    }

    if (finishIdx === prevTriedIdx) {
      return calculateTextDifference(
        startIdx,
        finishIdx - 1,
        word.length - 1,
        target,
        word,
      );
    } else {
      return calculateTextDifference(
        startIdx,
        finishIdx,
        word.length - 1,
        target,
        word,
      );
    }
  }

  return calculateTextDifference(-1, -1, word.length - 1, target);
};

export { showTextDifference };
