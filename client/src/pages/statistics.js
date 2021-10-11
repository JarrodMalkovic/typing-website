import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Text,
  Box,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import StatsCard from '../modules/statistics/components/stats-card';
import ChartCard from '../modules/statistics/components/chart-card';
import StatisticsMenu from '../modules/statistics/components/statistics-menu';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../common/contstants/base-api-url';
import { calculateHumanReadableTimeString } from '../common/utils/calculate-human-readable-time-string';
import AttemptsTable from '../modules/statistics/components/attempts-table';
import { useNonAdminRedirect } from '../modules/auth/hooks/use-non-admin-redirect';
import Spinner from '../common/components/spinner';
import { useTitle } from 'react-use';

const getStatistics = async (category) => {
  const { data } =
    category === 'All Exercises'
      ? await axios.get(`${BASE_API_URL}/api/questions/stats/`)
      : category === 'Challenge'
      ? await axios.get(
          `${BASE_API_URL}/api/questions/stats/?category=challenge`,
        )
      : await axios.get(
          `${BASE_API_URL}/api/questions/stats/?category=${category}`,
        );

  return data;
};

const Dashboard = () => {
  useTitle('KeyKorea - Exercise Statistics');
  const { isLoading: isAuthLoading } = useNonAdminRedirect('/');
  const [category, setCategory] = React.useState({
    category: 'All Exercises',
    name: 'All Exercises',
  });

  const { data, isLoading, isError } = useQuery(
    ['statistics', category.category],
    () => getStatistics(category.category),
    { retry: 3, retryDelay: 0 },
  );

  if (isAuthLoading) {
    return <Spinner />;
  }

  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={4} width="100%" align="stretch">
        <Box
          display={{ base: '', md: 'flex' }}
          alignItems={{ base: '', md: 'flex' }}
          justifyContent={{ base: '', md: 'space-between' }}>
          <Heading>{category.name} Statistics</Heading>
          <StatisticsMenu
            width={{ base: '100%', md: '48' }}
            setCategory={setCategory}
          />
        </Box>
        {isError ? (
          <VStack mt="8">
            <Heading size="md" textAlign="center">
              Sorry, something went wrong.
            </Heading>
            <Text textAlign="center">Could not fetch statistics data.</Text>
          </VStack>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={'4'}>
              <StatsCard
                title="Average WPM"
                stat={
                  typeof data.recent_stats.wpm__avg == 'number'
                    ? data.recent_stats.wpm__avg.toFixed(2)
                    : 'N/A'
                }
                time="Last 30 days"
              />
              <StatsCard
                title="Average Accuracy"
                stat={
                  typeof data.recent_stats.accuracy__avg == 'number'
                    ? `%${data.recent_stats.accuracy__avg.toFixed(2)}`
                    : 'N/A'
                }
                time="Last 30 days"
              />
              <StatsCard
                title="Average Time Elapsed"
                stat={
                  typeof data.recent_stats.time_elapsed__avg == 'number'
                    ? calculateHumanReadableTimeString(
                        data.recent_stats.time_elapsed__avg * 1000,
                      )
                    : 'N/A'
                }
                time="Last 30 days"
              />
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={'4'}>
              <ChartCard data={data.charts} dataKey="wpm" name="WPM" />

              <ChartCard
                data={data.charts}
                dataKey="accuracy"
                name="Accuracy"
              />
              <ChartCard
                data={data.charts}
                dataKey="time_elapsed"
                name="Time Elapsed"
              />
            </SimpleGrid>
            <Box
              border="1px solid"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              rounded={'lg'}>
              <AttemptsTable category={category.category} />
            </Box>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default Dashboard;
