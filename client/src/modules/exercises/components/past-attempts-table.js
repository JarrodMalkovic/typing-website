import * as React from 'react';

import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Box,
  Heading,
  Th,
  Td,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { calculateHumanReadableTimeString } from '../../../common/utils/calculate-human-readable-time-string';
import NoPastAttemptsPanel from './no-past-attempts-panel';
import { useTable, usePagination } from 'react-table';
import { humanReadableDateString } from '../../../common/utils/human-readable-date-string';
import Spinner from '../../../common/components/spinner';
import PaginationButtons from '../../../common/components/pagination-buttons';

const isChallenge = (str) => str === 'challenge';

const getPastAtttempts = async (exercise_slug, limit, page) => {
  const res = isChallenge(exercise_slug)
    ? await axios.get(
        `${BASE_API_URL}/api/challenge/attempts/?page=${page}&limit=${limit}`,
      )
    : await axios.get(
        `${BASE_API_URL}/api/practice/exercise/${exercise_slug}/attempts/?page=${page}&limit=${limit}`,
      );

  return res.data;
};

const PastAttemptsTable = ({ exercise_slug }) => {
  const [data, setData] = React.useState({ attempts: [], pages: 0 });

  const columns = React.useMemo(
    () => [
      {
        Header: 'Subexercise',
        Cell: (cell) =>
          cell.row.original.subexercise_slug
            ? cell.row.original.subexercise_slug.subexercise_name
            : 'N/A',
      },
      {
        Header: 'Attempted At',
        Cell: (cell) => humanReadableDateString(cell.row.original.created_at),
      },
      {
        Header: 'Score',
        Cell: (cell) => cell.row.original.score.toFixed(2),
      },
      {
        Header: 'WPM',
        Cell: (cell) => cell.row.original.wpm.toFixed(2),
      },
      {
        Header: 'Accuracy',
        Cell: (cell) => `%${cell.row.original.accuracy.toFixed(2)}`,
      },
      {
        Header: 'Time Taken',
        Cell: (cell) =>
          calculateHumanReadableTimeString(
            cell.row.original.time_elapsed * 1000,
          ),
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: data.attempts,
      pageCount: data.pages,
      manualPagination: true,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  );

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery(
    ['attempts', exercise_slug, { pageSize: pageSize, pageIndex: pageIndex }],
    () => getPastAtttempts(exercise_slug, pageSize, pageIndex),
    { keepPreviousData: true, retry: 3, retryDelay: 0 },
  );

  React.useEffect(() => {
    setData(apiResponse || { attempts: [], pages: 0 });
  }, [apiResponse]);

  return (
    <VStack spacing="4">
      <Box overflowX="auto" w="full">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <Th {...column.getHeaderProps()} isNumeric={idx >= 2}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => {
                    return (
                      <Td isNumeric={idx >= 2} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        {isError ? (
          <VStack mt="8">
            <Heading size="md" textAlign="center">
              Sorry, something went wrong.
            </Heading>{' '}
            <Text textAlign="center">Could not fetch past attempts data.</Text>
          </VStack>
        ) : isLoading ? (
          <Spinner color="blue.400" />
        ) : !apiResponse.attempts.length ? (
          <NoPastAttemptsPanel />
        ) : (
          <PaginationButtons
            pageOptions={pageOptions}
            pageCount={pageCount}
            canNextPage={canNextPage}
            nextPage={nextPage}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            pageSize={pageSize}
            pageIndex={pageIndex}
            setPageSize={setPageSize}
            gotoPage={gotoPage}
          />
        )}
      </Box>
    </VStack>
  );
};

PastAttemptsTable.propTypes = {
  exercise_slug: PropTypes.string,
  filter: PropTypes.string,
};

export default PastAttemptsTable;
