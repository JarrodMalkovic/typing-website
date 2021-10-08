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
  Flex,
  Tooltip,
  IconButton,
  Text,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { calculateHumanReadableTimeString } from '../../../common/utils/calculate-human-readable-time-string';
import NavLink from 'next/link';
import { useTable, usePagination } from 'react-table';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';

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

  const columns = React.useMemo(
    () => [
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
        Header: 'Score',
        accessor: 'score',
      },
      {
        Header: 'WPM',
        accessor: 'wpm',
      },
      {
        Header: 'Accuracy',
        accessor: 'accuracy',
      },
      {
        Header: 'Time Elapsed',
        accessor: 'time_elapsed',
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

  console.log(data);

  const { data: apiResponse } = useQuery(
    ['stats', 'attempts', category, { limit: pageSize, page: pageIndex }],
    () => getAttempts(category, pageIndex, pageSize),
  );

  React.useEffect(() => {
    setData(apiResponse || { attempts: [], pages: 0 });
  }, [apiResponse]);

  return (
    <>
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

      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Page{' '}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{' '}
            of{' '}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{' '}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
};

export default AttemptsTable;
