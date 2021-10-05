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
  ButtonGroup,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import NavLink from 'next/link';
import { useTable, usePagination } from 'react-table';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import PromoteUserButton from './promote-user-button';
import DemoteUserButton from './demote-user-button';
import BanUserButton from './ban-user-button';
import { humanReadableDateString } from '../../../common/utils/human-readable-date-string';

const getUsers = async (page, limit, search) => {
  const { data } = await axios.get(
    `${BASE_API_URL}/api/users/?${page}=page&limit=${limit}&search=${search}`,
  );

  return data;
};

const UsersTable = ({ search, setRefetch }) => {
  const [data, setData] = React.useState({ users: [], pages: 0 });

  const columns = React.useMemo(
    () => [
      {
        Header: 'User',
        Cell: ({ cell }) => (
          <HStack spacing="4">
            <Avatar size="sm" src={cell.row.original.avatar} />
            <NavLink href={`/profile/${cell.row.original.username}`}>
              <Link
                _hover={{
                  color: 'blue.400',
                  textDecoration: 'underline',
                }}>
                {cell.row.original.username}
              </Link>
            </NavLink>
          </HStack>
        ),
      },
      {
        Header: 'Date Joined',
        accessor: 'created_at',
        Cell: ({ cell }) => humanReadableDateString(cell.value),
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        Cell: ({ cell }) => (
          <>
            {' '}
            {cell.row.original.is_superuser
              ? 'Super Admin'
              : cell.row.original.is_staff
              ? 'Admin'
              : 'Student'}
          </>
        ),
      },
      {
        Header: '',
        accessor: 'buttons',
        Cell: ({ cell }) => (
          <ButtonGroup float="right">
            {cell.row.original.is_superuser ? null : cell.row.original
                .is_staff ? (
              <DemoteUserButton
                username={cell.row.original.username}
                userId={cell.row.original.id}
              />
            ) : (
              <PromoteUserButton
                username={cell.row.original.username}
                userId={cell.row.original.id}
              />
            )}
            {!cell.row.original.is_superuser && (
              <BanUserButton
                username={cell.row.original.username}
                userId={cell.row.original.id}
              />
            )}
          </ButtonGroup>
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
      data: data.users,
      pageCount: data.pages,
      manualPagination: true,
      initialState: { pageIndex: 0 },
    },
    usePagination,
  );

  const { data: apiResponse, refetch } = useQuery(
    ['users', { pageSize: pageSize, pageIndex: pageIndex, search: search }],
    () => getUsers(pageIndex, pageSize, search),
    { keepPreviousData: true },
  );

  React.useEffect(() => {
    setData(apiResponse || { users: [], pages: 0 });
  }, [apiResponse]);

  React.useEffect(() => {
    refetch();
  }, [search]);

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
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
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
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

export default UsersTable;
