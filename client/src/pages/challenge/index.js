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

const getCompletionPercentage = (currentQuestionIndex, totalQuestions) =>
  Math.ceil((currentQuestionIndex / totalQuestions) * 100);

const getChallengeQuestions = async () => {
  const res = await axios.get(`${BASE_API_URL}/api/challenge/`);

  return res.data;
};

const Challenge = () => {
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
            <Heading fontSize="45px" padding="20px" position="absolute" top={0}>
              Challenge Mode
            </Heading>
            <Text
              fontSize="20px"
              top={40}
              align="center"
              position="absolute"
              maxW="container.md"
              textAlign = "center"
              fontWeight = "medium"
            >
              This mode puts your korean typing skills to the ultimate test!
              Challenge Mode tests all your skills, containing exercises on
              Letters, Sylabbles, Words, Short and Long Sentences and Dictation! 

              <br></br>
              <br></br>

              <Text textAlign = "center">You can track how you go, and enter a
              leaderboard with your other peers! Good Luck! </Text>
            
            </Text>



            <ButtonGroup position="absolute" top={80} padding = "50px">
              <Button
                size="lg"
                variant="ghost"
                isLoading={isFetching}
                onClick={refetch}
                bgColor="#39aae1"
                _hover={{
                  bg: '#f52c56',
                }}
                color="white">
                Start Challenge
              </Button>
              <NextLink href="/practice">
                <Button
                  size="lg"
                  variant="ghost"
                  bgColor="#39aae1"
                  _hover={{
                    bg: '#f52c56',
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
