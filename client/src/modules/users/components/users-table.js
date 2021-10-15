import * as React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  Avatar,
  HStack,
  VStack,
  Heading,
  Text,
  Link,
  ButtonGroup,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import NavLink from 'next/link';
import { useTable, usePagination } from 'react-table';
import PromoteUserButton from './promote-user-button';
import DemoteUserButton from './demote-user-button';
import BanUserButton from './ban-user-button';
import { humanReadableDateString } from '../../../common/utils/human-readable-date-string';
import PaginationButtons from '../../../common/components/pagination-buttons';
import Spinner from '../../../common/components/spinner';
import { useAuth } from '../../auth/hooks/use-auth';

const getUsers = async (page, limit, search) => {
  const { data } = await axios.get(
    `${BASE_API_URL}/api/users/?page=${page}&limit=${limit}&search=${search}`,
  );

  return data;
};

const UsersTable = ({ search, setRefetch }) => {
  const [data, setData] = React.useState({ users: [], pages: 0 });
  const { state } = useAuth();

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
        Cell: ({ cell }) => {
          if (
            state.user.id == cell.row.original.id ||
            (cell.row.original.is_staff && !state.user.isSuperAdmin)
          ) {
            return null;
          }

          if (cell.row.original.is_staff && state.user.isSuperAdmin) {
            return (
              <ButtonGroup float="right">
                <DemoteUserButton
                  username={cell.row.original.username}
                  userId={cell.row.original.id}
                />
                <BanUserButton
                  username={cell.row.original.username}
                  userId={cell.row.original.id}
                />
              </ButtonGroup>
            );
          }

          if (!cell.row.original.is_staff && state.user.isSuperAdmin) {
            return (
              <ButtonGroup float="right">
                <PromoteUserButton
                  username={cell.row.original.username}
                  userId={cell.row.original.id}
                />
                <BanUserButton
                  username={cell.row.original.username}
                  userId={cell.row.original.id}
                />
              </ButtonGroup>
            );
          }

          return (
            <ButtonGroup float="right">
              <BanUserButton
                username={cell.row.original.username}
                userId={cell.row.original.id}
              />
            </ButtonGroup>
          );
        },
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

  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery(
    ['users', { pageSize: pageSize, pageIndex: pageIndex, search: search }],
    () => getUsers(pageIndex, pageSize, search),
    { keepPreviousData: true, retry: 3, retryDelay: 0 },
  );

  React.useEffect(() => {
    setData(apiResponse || { users: [], pages: 0 });
  }, [apiResponse]);

  return (
    <Box overflowX="auto">
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

      {isError ? (
        <VStack my="8">
          <Heading size="md" textAlign="center">
            Sorry, something went wrong.
          </Heading>
          <Text textAlign="center">Could not fetch user data.</Text>
        </VStack>
      ) : isLoading ? (
        <Spinner />
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
  );
};

export default UsersTable;
