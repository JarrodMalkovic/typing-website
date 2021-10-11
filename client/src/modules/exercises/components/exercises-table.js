import * as React from 'react';

import {
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Heading,
  Tr,
  Alert,
  Th,
  Td,
  chakra,
  AlertIcon,
  Checkbox,
  Box,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  useTable,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import DeleteSelectedExercisesButton from './delete-selected-exercises-button';
import EditExerciseButton from './edit-exercise-button';
import Spinner from '../../../common/components/spinner';
import NoExercisesPanel from './no-exercises-panel';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    return <Checkbox isChecked={rest.checked} ref={resolvedRef} {...rest} />;
  },
);

const getQuestions = async () => {
  const res = await axios.get(`${BASE_API_URL}/api/exercises/`);

  return res.data;
};

const ExercisesTable = ({ filter }) => {
  const [tableData, setTableData] = React.useState([]);
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery(['exercises', 'dashboard'], () => getQuestions(), {
    retry: 3,
    retryDelay: 0,
  });

  React.useEffect(() => {
    setTableData(apiResponse || []);
  }, [apiResponse]);

  React.useEffect(() => {
    setGlobalFilter(filter);
  }, [filter]);

  const [columns, data] = React.useMemo(() => {
    const columns = [
      {
        Header: 'Name',
        accessor: 'exercise_name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Date Created',
        accessor: 'created_at',
        Cell: ({ cell }) => {
          const date = new Date(cell.value);
          return date.toDateString();
        },
      },
      {
        Header: '',
        accessor: 'editButton',
        Cell: ({ cell }) => <EditExerciseButton exercise={cell.row.original} />,
        disableSortBy: true,
      },
    ];

    return [columns, tableData];
  }, [tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          // eslint-disable-next-line react/display-name
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          // eslint-disable-next-line react/display-name
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    },
  );

  return (
    <VStack spacing="4">
      {selectedFlatRows.length && (
        <Alert status="warning">
          <AlertIcon />

          <Text>
            You have selected {selectedFlatRows.length}{' '}
            {selectedFlatRows.length > 1 ? 'items' : 'item'} to be permanently
            deleted.{' '}
            <DeleteSelectedExercisesButton selectedItems={selectedFlatRows} />
          </Text>
        </Alert>
      )}
      <Box overflowX="auto" w="full">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup, idx) => (
              <Tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <Th
                    key={idx}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    isNumeric={column.isNumeric}>
                    {column.render('Header')}
                    <chakra.span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          {!isLoading && data.length > 0 && (
            <Tbody {...getTableBodyProps()}>
              {rows.map((row, idx) => {
                prepareRow(row);
                return (
                  <Tr key={idx} {...row.getRowProps()}>
                    {row.cells.map((cell, idx) => (
                      <Td
                        key={idx}
                        {...cell.getCellProps()}
                        isNumeric={cell.column.isNumeric}>
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
        {isError ? (
          <VStack mt="8">
            <Heading size="md" textAlign="center">
              Sorry, something went wrong.
            </Heading>{' '}
            <Text textAlign="center">Could not fetch exercises data.</Text>
          </VStack>
        ) : isLoading ? (
          <Spinner />
        ) : apiResponse && apiResponse.length <= 0 ? (
          <NoExercisesPanel />
        ) : null}
      </Box>
    </VStack>
  );
};

ExercisesTable.propTypes = {
  exercise_slug: PropTypes.string,
  filter: PropTypes.string,
};

export default ExercisesTable;
