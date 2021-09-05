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
  Spinner,
  Checkbox,
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  useTable,
  useSortBy,
  useRowSelect,
  useGlobalFilter,
} from 'react-table';
import DeleteSelectedItemsButton from './delete-selected-items-button';
import EditQuestionButton from './edit-question-button';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import { useQuery } from 'react-query';
import NoQuestionsPanel from './no-questions-panel';
import PropTypes from 'prop-types';
import { isDictionSlug } from '../exercises/utils/is-diction-slug';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    return <Checkbox isChecked={rest.checked} ref={resolvedRef} {...rest} />;
  },
);

const getQuestions = async (exercise_slug) => {
  const res = await axios.get(
    `${BASE_API_URL}/api/questions/exercise/${exercise_slug}/`,
  );

  return res.data;
};

const DataTable = ({ exercise_slug, filter }) => {
  const [tableData, setTableData] = React.useState([]);
  const { data: apiResponse, isLoading } = useQuery(exercise_slug, () =>
    getQuestions(exercise_slug),
  );

  React.useEffect(() => {
    setTableData(apiResponse || []);
  }, [apiResponse]);

  React.useEffect(() => {
    setGlobalFilter(filter);
  }, [filter]);

  const [columns, data] = React.useMemo(() => {
    const columns = [
      {
        Header: 'Subexercise',
        accessor: 'subexercise_slug.subexercise_name',
      },
      {
        Header: 'Question',
        accessor: 'question',
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
        Cell: ({ cell }) => (
          <EditQuestionButton
            row={cell.row.original}
            exercise={exercise_slug}
          />
        ),
        disableSortBy: true,
      },
    ];

    if (isDictionSlug(exercise_slug)) {
      columns.splice(columns.length - 1, 0, {
        Header: 'Audio',
        accessor: 'audio_url',
        Cell: ({ cell }) => {
          return <audio controls="controls" src={cell.value} />;
        },
      });
    }

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
            <DeleteSelectedItemsButton
              exercise_slug={exercise_slug}
              selectedItems={selectedFlatRows}
            />
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
      {apiResponse.length > 0 ? null : isLoading ? (
        <Spinner color="blue.400" />
      ) : (
        <NoQuestionsPanel />
      )}
    </VStack>
  );
};

DataTable.propTypes = {
  exercise_slug: PropTypes.string,
  filter: PropTypes.string,
};

export default DataTable;
