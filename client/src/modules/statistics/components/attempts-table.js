import * as React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Avatar,
  HStack,
  VStack,
  Text,
  Heading,
  Box,
  Link,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { calculateHumanReadableTimeString } from '../../../common/utils/calculate-human-readable-time-string';
import NavLink from 'next/link';
import { useTable, usePagination } from 'react-table';
import { humanReadableDateString } from '../../../common/utils/human-readable-date-string';
import PaginationButtons from '../../../common/components/pagination-buttons';
import Spinner from '../../../common/components/spinner';
import NoAttemptsPanel from './no-attempts-tabel';

const getAttempts = async (category, page, limit) => {
  const { data } =
    category === 'All Exercises'
      ? await axios.get(
          `${BASE_API_URL}/api/questions/attempts/?page=${page}&limit=${limit}`,
        )
      : category === 'Challenge'
      ? await axios.get(
          `${BASE_API_URL}/api/questions/attempts/?category=challenge&page=${page}&limit=${limit}`,
        )
      : await axios.get(
          `${BASE_API_URL}/api/questions/attempts/?category=${category}&page=${page}&limit=${limit}`,
        );

  return data;
};

const AttemptsTable = ({ category }) => {
  const [data, setData] = React.useState({ attempts: [], pages: 0 });

  const columns = React.useMemo(() => {
    const columns = [
      {
        Header: 'User',
        accessor: 'user',
        Cell: ({ cell }) => (
          <HStack spacing="4">
            <Avatar size="sm" src={cell.value.avatar} />
            <NavLink href={`/profile/${cell.value.username}`}>
              <Link
                _hover={{
                  color: 'blue.400',
                  textDecoration: 'underline',
                }}>
                {cell.value.username}
              </Link>
            </NavLink>
          </HStack>
        ),
      },
      {
        Header: 'Completed At',
        accessor: 'created_at',
        Cell: (cell) => humanReadableDateString(cell.row.original.created_at),
      },
      {
        Header: 'Subexercise',
        Cell: (cell) => {
          const subexercise = cell.row.original.subexercise_slug;
          return subexercise ? subexercise.subexercise_name : 'N/A';
        },
        show: false,
      },
      {
        Header: 'Score',
        accessor: 'score',
        Cell: (cell) => cell.row.original.score.toFixed(2),
      },
      {
        Header: 'WPM',
        accessor: 'wpm',
        Cell: (cell) => cell.row.original.wpm.toFixed(2),
      },
      {
        Header: 'Accuracy',
        accessor: 'accuracy',
        Cell: (cell) => `%${cell.row.original.accuracy.toFixed(2)}`,
      },
      {
        Header: 'Time Elapsed',
        accessor: 'time_elapsed',
        Cell: (cell) =>
          calculateHumanReadableTimeString(
            cell.row.original.time_elapsed * 1000,
          ),
      },
    ];

    return columns;
  }, []);

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
    ['stats', 'attempts', category, { limit: pageSize, page: pageIndex }],
    () => getAttempts(category, pageIndex, pageSize),
    { keepPreviousData: true, retry: 3, retryDelay: 0 },
  );

  React.useEffect(() => {
    setData(apiResponse || { attempts: [], pages: 0 });
  }, [apiResponse]);

  return (
    <Box overflowX="auto">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  isNumeric={column.render('Header') !== 'User'}
                  {...column.getHeaderProps()}>
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
                {row.cells.map((cell) => {
                  return (
                    <Td isNumeric {...cell.getCellProps()}>
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
        <VStack my="8">
          <Heading size="md" textAlign="center">
            Sorry, something went wrong.
          </Heading>
          <Text textAlign="center">Could not fetch attempts data.</Text>
        </VStack>
      ) : isLoading ? (
        <Spinner />
      ) : apiResponse.attempts && apiResponse.attempts.length <= 0 ? (
        <NoAttemptsPanel />
      ) : apiResponse.attempts && apiResponse.attempts.length > 0 ? (
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
      ) : null}
    </Box>
  );
};

export default AttemptsTable;
