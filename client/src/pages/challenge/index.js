import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Text,
  Button,
  useColorModeValue,
  ButtonGroup,
  Stack,
  useTheme,
  Image,
  Box,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import ExerciseContent from '../../modules/exercises/components/exercise-content';
import ChallengeSummary from '../../modules/exercises/components/challenge-summary';
import ProgressBar from '@ramonak/react-progress-bar';
import { useUnauthorizedRedirect } from '../../modules/auth/hooks/use-unauthorized-redirect';
import Spinner from '../../common/components/spinner';
import { useTitle } from 'react-use';

const getCompletionPercentage = (currentQuestionIndex, totalQuestions) =>
  Math.ceil((currentQuestionIndex / totalQuestions) * 100);

const getChallengeQuestions = async () => {
  const res = await axios.get(`${BASE_API_URL}/api/challenge/`);

  return res.data;
};

const Challenge = () => {
  useTitle('KeyKorea - Challenge Mode');
  const { isLoading: isAuthLoading } = useUnauthorizedRedirect('/auth/sign-in');

  const theme = useTheme();
  const queryClient = useQueryClient();

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [accuracy, setAccuracy] = React.useState(100);
  const [wordsTyped, setWordsTyped] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  const { data, refetch, isFetching } = useQuery(
    'challenge',
    getChallengeQuestions,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: () => {
        setIsPlaying(true);
      },
    },
  );

  const restartChallengeMode = () => {
    queryClient.invalidateQueries('challenge');
    refetch();
    setAccuracy(100);
    setWordsTyped(0);
    setStartDate(new Date());
    setCurrentQuestionIndex(0);
  };

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isPlaying ? (
        <Container pt="8" maxW="container.xl">
          <ProgressBar
            bgColor={theme.colors.blue['400']}
            baseBgColor={useColorModeValue(
              theme.colors.gray['200'],
              theme.colors.gray['700'],
            )}
            labelColor={useColorModeValue(
              theme.colors.gray['700'],
              theme.colors.gray['200'],
            )}
            completed={getCompletionPercentage(
              currentQuestionIndex,
              data.length,
            )}
          />
          <Stack spacing={8} mx={'auto'} maxW={'3xl'} py={12} px={6}>
            {currentQuestionIndex >= data.length ? (
              <ChallengeSummary
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                startDate={startDate}
                wordsTyped={wordsTyped}
                accuracy={accuracy}
                refetch={refetch}
                restartChallengeMode={restartChallengeMode}
              />
            ) : (
              <ExerciseContent
                questions={data}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                currentQuestionIndex={currentQuestionIndex}
                startDate={startDate}
                wordsTyped={wordsTyped}
                setWordsTyped={setWordsTyped}
                accuracy={accuracy}
                setAccuracy={setAccuracy}
              />
            )}
          </Stack>
        </Container>
      ) : (
        <Box position="relative">
          <VStack spacing={5} width="100%">
            <Image
              minW="full"
              opacity="30%"
              linear-gradient="(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25))"
              src="/images/Basic.png"
            />
            <Heading position="absolute" top={0}>
              Challenge Mode
            </Heading>
            <Text
              fontSize="lg"
              top={20}
              align="center"
              position="absolute"
              color={useColorModeValue('gray.600', 'gray.200')}
              maxW="container.md">
              This mode puts your korean typing skills to the ultimate test!
              Challenge Mode tests all your skills, containing exercises on
              Letters, Sylabbles, Words, Short Sentances, Long Sentances and
              Diction! <br></br>You can track how you go, and enter a
              leaderboard with your other peers! <br></br>Good Luck!
            </Text>
            <ButtonGroup position="absolute" top={80}>
              <Button
                size="sm"
                variant="ghost"
                isLoading={isFetching}
                onClick={refetch}
                bgColor="rgba(200,16,46,0.7)"
                _hover={{
                  bg: 'rgba(0,47,108,0.7)',
                }}
                color="white">
                Start Challenge
              </Button>
              <NextLink href="/practice">
                <Button
                  size="sm"
                  variant="ghost"
                  bgColor="rgba(200,16,46,0.7)"
                  _hover={{
                    bg: 'rgba(0,47,108,0.7)',
                  }}
                  color="white">
                  I need some practice first
                </Button>
              </NextLink>
            </ButtonGroup>
          </VStack>
        </Box>
      )}
    </>
  );
};

export default Challenge;
