import * as React from 'react';

import {
  Container,
  Heading,
  HStack,
  useColorModeValue,
  ButtonGroup,
  Button,
  Image,
  Spacer,
  Grid,
  VStack,
  Center,
  Text,
  Box,
  useBreakpointValue,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Stack,
} from '@chakra-ui/react';
import ReactTooltip from 'react-tooltip';
import CalendarHeatmap from 'react-calendar-heatmap';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import { calculateHumanReadableTimeString } from '../../common/utils/calculate-human-readable-time-string';
import { humanized_time_span } from '../../common/utils/humanized-time-span';
import { useTitle } from 'react-use';
import Spinner from '../../common/components/spinner';

const getProfile = async (username) => {
  const { data } = await axios.get(
    `${BASE_API_URL}/api/user/profile/${username}/`,
  );
  return data;
};

const Profile = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(
    ['profile', router.query.username],
    () => getProfile(router.query.username),
    {
      retry: 3,
      retryDelay: 0,
    },
  );
  const isMediumBreakpoint = useBreakpointValue({ md: false, base: true });
  const isSmallBreakpoint = useBreakpointValue({ sm: false, base: true });

  const calculateStartDate = () =>
    isSmallBreakpoint
      ? new Date(new Date().setMonth(new Date().getMonth() - 6))
      : isMediumBreakpoint
      ? new Date(new Date().setMonth(new Date().getMonth() - 9))
      : new Date(new Date().setFullYear(new Date().getFullYear() - 1));

  React.useEffect(() => {
    ReactTooltip.rebuild();
  });

  useTitle(
    `KeyKorea - ${
      isLoading
        ? 'Loading...'
        : `${
            data && data.user && data.user.username
              ? data.user.username + 's Profile'
              : 'Profile Not Found'
          }`
    } `,
  );

  return (
    <Container pt="8" maxW="container.xl">
      <Stack spacing={4} width="100%" align="stretch">
        {isError ? (
          <VStack>
            <Heading>Sorry, something went wrong!</Heading>
            <Text>
              Could not find a user with the username {router.query.username}
            </Text>
          </VStack>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <Grid templateColumns="repeat(18, 1fr)" gap={'4'}>
            <GridItem colSpan={[18, 18, 18, 6]} overflowX="auto">
              <Box
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                rounded={'lg'}
                px={{ base: 2, md: 4 }}
                py="2"
                pt="5"
                pb="4"
                mb="4">
                <HStack>
                  <Image
                    minWidth="75px"
                    maxWidth="75px"
                    minHeight="75px"
                    maxHeight="75px"
                    borderRadius="500px"
                    src={data.user.avatar}
                  />
                  <Box>
                    <Heading size="md">{data.user.username}</Heading>
                    <Text
                      fontSize="sm"
                      color={useColorModeValue('gray.700', 'gray.200')}>
                      Account Created:{' '}
                      {(() => {
                        const date = new Date(data.user.created_at);
                        return date.toDateString();
                      })()}
                    </Text>
                  </Box>
                </HStack>
              </Box>
              <Box
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                rounded={'lg'}>
                <Box
                  px={{ base: 2, md: 4 }}
                  py="2"
                  borderBottom="1px solid"
                  borderColor={useColorModeValue('gray.200', 'gray.700')}>
                  <Heading size="sm">About</Heading>
                </Box>
                <Box px={{ base: 2, md: 4 }} py="2" pt="2">
                  <Text color={useColorModeValue('gray.700', 'gray.200')}>
                    {data.user.bio.length === 0
                      ? 'This user has not made a bio yet.'
                      : data.user.bio}
                  </Text>
                </Box>
              </Box>
            </GridItem>
            <GridItem experimental_spaceY={'4'} colSpan={[18, 18, 18, 12]}>
              <Grid templateColumns="repeat(3, 1fr)" gap={'4'}>
                <GridItem colSpan={[3, 1, 1, 1]}>
                  <Box
                    border="1px solid"
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    rounded={'lg'}>
                    <Stat px={{ base: 2, md: 4 }} py="2" pt="4">
                      <StatLabel isTruncated>Average WPM</StatLabel>
                      <StatNumber>
                        {data.stats.wpm__avg
                          ? data.stats.wpm__avg.toFixed(2)
                          : 'N/A'}
                      </StatNumber>
                      <StatHelpText>Last 30 Days</StatHelpText>
                    </Stat>
                  </Box>{' '}
                </GridItem>{' '}
                <GridItem colSpan={[3, 1, 1, 1]}>
                  <Box
                    border="1px solid"
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    rounded={'lg'}>
                    <Stat px={{ base: 2, md: 4 }} py="2" pt="4">
                      <Box>
                        <StatLabel isTruncated>Average Score</StatLabel>
                        <StatNumber>
                          {data.stats.score__avg
                            ? data.stats.score__avg.toFixed(2)
                            : 'N/A'}
                        </StatNumber>
                        <StatHelpText>Last 30 Days</StatHelpText>
                      </Box>
                    </Stat>
                  </Box>
                </GridItem>
                <GridItem colSpan={[3, 1, 1, 1]}>
                  <Box
                    border="1px solid"
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    rounded={'lg'}>
                    <Stat px={{ base: 2, md: 4 }} py="2" pt="4">
                      <Box>
                        <StatLabel isTruncated>Average Time Taken</StatLabel>
                        <StatNumber>
                          {data.stats.time_elapsed__avg
                            ? calculateHumanReadableTimeString(
                                data.stats.time_elapsed__avg * 1000,
                              )
                            : 'N/A'}
                        </StatNumber>
                        <StatHelpText>Last 30 Days</StatHelpText>
                      </Box>
                    </Stat>
                  </Box>
                </GridItem>
              </Grid>

              <GridItem
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                rounded={'lg'}
                w="100%"
                colSpan={[6, 6, 6, 4]}>
                <Box
                  px={{ base: 2, md: 4 }}
                  py="2"
                  borderBottom="1px solid"
                  borderColor={useColorModeValue('gray.200', 'gray.700')}>
                  <Heading size="sm">
                    {data.heatmap_data.reduce(
                      (acc, curr) => (acc += curr.count),
                      0,
                    )}{' '}
                    attempts in the last year
                  </Heading>
                </Box>
                <Box px={{ base: 2, md: 4 }} py="2" pt="2">
                  <CalendarHeatmap
                    startDate={calculateStartDate()}
                    endDate={new Date()}
                    values={data.heatmap_data}
                    classForValue={(value) => {
                      if (!value) {
                        return 'color-empty';
                      }

                      return `color-scale-${Math.min(value.count, 9)}`;
                    }}
                    tooltipDataAttrs={(value) => {
                      if (!value || !value.date) {
                        return null;
                      }

                      const date = new Date(value.date);

                      return {
                        'data-tip': `${value.count} attempt${
                          value.count >= 1 && 's'
                        } on ${date.toDateString()} `,
                      };
                    }}
                  />
                </Box>
              </GridItem>
              <GridItem
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
                rounded={'lg'}
                w="100%"
                colSpan={[6, 6, 6, 4]}
                colStart={[0, 0, 0, 3]}>
                <Box
                  px={{ base: 2, md: 4 }}
                  py="2"
                  borderBottom="1px solid"
                  borderColor={useColorModeValue('gray.200', 'gray.700')}>
                  <Heading size="sm">Most Recent Attempts</Heading>
                </Box>
                <Box px={{ base: 2, md: 4 }} py="2" pt="2">
                  {data.recent_attempts.length === 0 && (
                    <Center>
                      <Text>This user has made no attempts yet.</Text>
                    </Center>
                  )}
                  {data.recent_attempts.map((attempt, idx) => (
                    <Box
                      py="2"
                      borderTop={idx === 0 ? '' : '1px solid'}
                      borderColor={useColorModeValue('gray.200', 'gray.700')}>
                      <HStack>
                        <Heading
                          size="xs"
                          color={useColorModeValue('gray.700', 'gray.200')}>
                          {attempt.subexercise_slug.subexercise_name}
                        </Heading>
                        <Text
                          fontSize="xs"
                          color={useColorModeValue('gray.600', 'gray.400')}>
                          {humanized_time_span(attempt.created_at)}
                        </Text>
                        <Spacer />
                        <Box px="10px" py="2px" bg="blue.400" borderRadius="20">
                          <Text fontWeight="bold" color="white" fontSize="xs">
                            {
                              attempt.subexercise_slug.exercise_slug
                                .exercise_name
                            }
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </Box>
              </GridItem>
            </GridItem>
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default Profile;
