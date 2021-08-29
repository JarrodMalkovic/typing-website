import * as React from 'react';

import {
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Alert,
  Th,
  Td,
  chakra,
  AlertIcon,
  Checkbox,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useRowSelect } from 'react-table';
import DeleteSelectedItemsButton from './delete-selected-items-button';
import EditExerciseButton from './edit-exercise-button';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    return <Checkbox isChecked={rest.checked} ref={resolvedRef} {...rest} />;
  },
);

const DataTable = () => {
  // Random Placeholder data for now - eventually this will be fetched from the backend
  const data = React.useMemo(
    () => [
      {
        subexercise: 'Left Handed',
        question: 'hello',
        dateCreated: '2/14/2019',
      },
      {
        subexercise: 'Right Handed',
        question: 'hello',
        dateCreated: '2/14/2019',
      },
      {
        subexercise: 'Test',
        question: 'hello',
        dateCreated: '2/14/2019',
      },
      {
        subexercise: 'Sample',
        question: 'hello',
        dateCreated: '2/14/2019',
      },
      {
        subexercise: 'Sample',
        question: 'hello',
        dateCreated: '2/14/2019',
      },
      {
        subexercise: 'Sample',
        question: 'hello',
        dateCreated: '2/14/2019',
      },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Subexercise',
        accessor: 'subexercise',
      },
      {
        Header: 'Question',
        accessor: 'question',
      },
      {
        Header: 'Date Created',
        accessor: 'dateCreated',
      },
      {
        Header: '',
        accessor: 'editButton',
        Cell: () => <EditExerciseButton />,
        disableSortBy: true,
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({ columns, data }, useSortBy, useRowSelect, (hooks) => {
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
  });

  return (
    <VStack spacing="4">
      {selectedFlatRows.length && (
        <Alert status="warning">
          <AlertIcon />

          <Text>
            You have selected {selectedFlatRows.length}{' '}
            {selectedFlatRows.length > 1 ? 'items' : 'item'} to be permanently
            deleted.{' '}
            <DeleteSelectedItemsButton selectedItems={selectedFlatRows} />
          </Text>
        </Alert>
      )}
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
      </Table>
    </VStack>
  );
};

export default DataTable;
