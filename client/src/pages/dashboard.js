import * as React from 'react';

import {
  Container,
  Heading,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Spacer,
  Button,
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

import { AddIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useRowSelect } from 'react-table';

const tabData = [
  { label: 'Letters', content: '' },
  { label: 'Syllables', content: '' },
  { label: 'Words', content: '' },
  { label: 'Short Sentences', content: '' },
  { label: 'Long Sentences', content: '' },
  { label: 'Diction', content: '' },
];

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <Checkbox ref={resolvedRef} {...rest} />;
  },
);

const DataTable = () => {
  // Random Placeholder data
  const data = React.useMemo(
    () => [
      {
        fromUnit: 'inches',
        toUnit: 'millimetres (mm)',
        factor: 25.4,
      },
      {
        fromUnit: 'feet',
        toUnit: 'centimetres (cm)',
        factor: 30.48,
      },
      {
        fromUnit: 'yards',
        toUnit: 'metres (m)',
        factor: 0.91444,
      },
    ],
    [],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'To convert',
        accessor: 'fromUnit',
      },
      {
        Header: 'Into',
        accessor: 'toUnit',
      },
      {
        Header: 'Multiply by',
        accessor: 'factor',
        isNumeric: true,
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
    state: { selectedRowIds },
  } = useTable({ columns, data }, useSortBy, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        ),
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
            <Button colorScheme="white" variant="link">
              {' '}
              Delete Selected.
            </Button>
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

const Dashboard = () => {
  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={2} width="100%" align="stretch">
        <Flex>
          <Heading>Admin Dashboard</Heading>

          <Spacer />

          <Button
            bgColor="blue.400"
            color="white"
            leftIcon={<AddIcon />}
            variant="solid">
            Add Question
          </Button>
        </Flex>
        <Text>
          This is a short sentence which describes what this dashboard is all
          about
        </Text>
        <Tabs variant="enclosed">
          <TabList>
            {tabData.map((tab, idx) => (
              <Tab key={idx}>{tab.label}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabData.map((tab, idx) => (
              <TabPanel paddingX="0" key={idx}>
                <DataTable />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

export default Dashboard;
