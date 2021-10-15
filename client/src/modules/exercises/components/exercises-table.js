import React from 'react';
import { useTable } from 'react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
  Table as ChakraTable,
  Th,
  Tr,
  Td,
  Box,
  VStack,
  Heading,
  Text,
  Tbody,
  Thead,
  ButtonGroup,
} from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import EditExerciseButton from './edit-exercise-button';
import Spinner from '../../../common/components/spinner';
import NoSubexercisesPanel from './no-subexercises-panel';
import DeleteExerciseButton from './delete-exercise-button';

const reorderSubexercises = async ({ body }) => {
  const { data } = await axios.patch(`${BASE_API_URL}/api/exercises/`, body);
  return data;
};

const Table = ({
  columns,
  records,
  setRecords,
  exercise_slug,
  isLoading,
  apiResponse,
  isError,
}) => {
  const { mutate } = useMutation(reorderSubexercises);

  const getRowId = React.useCallback((row) => {
    return row.exercise_slug;
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      data: records,
      columns,
      getRowId,
    });

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];

    const rows = update(records, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRecord],
      ],
    });

    setRecords(rows);

    const reordered = rows
      .map((row, idx) => {
        return { exercise_slug: row.exercise_slug, level: idx + 1 };
      })
      .reduce(
        (obj, item) =>
          Object.assign(obj, {
            [item.exercise_slug]: { level: item.level },
          }),
        {},
      );

    mutate({ body: reordered, exercise_slug });
  };

  return (
    <Box overflowX="auto">
      <DndProvider backend={HTML5Backend}>
        <ChakraTable {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                <Th />
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(
              (row, index) =>
                prepareRow(row) || (
                  <Row
                    index={index}
                    row={row}
                    moveRow={moveRow}
                    {...row.getRowProps()}
                  />
                ),
            )}
          </Tbody>
        </ChakraTable>
        {isError ? (
          <VStack mt="8">
            <Heading size="md" textAlign="center">
              Sorry, something went wrong.
            </Heading>
            <Text textAlign="center">Could not fetch subexercise data.</Text>
          </VStack>
        ) : isLoading ? (
          <Spinner />
        ) : apiResponse && apiResponse.length <= 0 ? (
          <NoSubexercisesPanel />
        ) : null}
      </DndProvider>
    </Box>
  );
};

const DND_ITEM_TYPE = 'row';

const Row = ({ row, index, moveRow }) => {
  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DND_ITEM_TYPE, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <Tr ref={dropRef} style={{ opacity }}>
      <Td ref={dragRef}>
        <DragHandleIcon
          _hover={{ cursor: 'grab' }}
          color="gray.400"
          fontSize="sm"
        />
      </Td>
      {row.cells.map((cell) => {
        return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
      })}
    </Tr>
  );
};

const getExercises = async () => {
  const { data } = await axios.get(`${BASE_API_URL}/api/exercises/`);

  return data;
};

const SubexercisesTable = ({ exercise_slug }) => {
  const [tableData, setTableData] = React.useState([]);
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery(['exercises', 'dashboard'], () => getExercises(exercise_slug), {
    retry: 3,
    retryDelay: 0,
  });

  console.log(apiResponse);

  React.useEffect(() => {
    setTableData(apiResponse || []);
  }, [apiResponse, isLoading]);

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
        Cell: ({ cell }) => (
          <ButtonGroup float="right">
            <EditExerciseButton exercise={cell.row.original} />
            <DeleteExerciseButton exercise={cell.row.original} />
          </ButtonGroup>
        ),
        disableSortBy: true,
      },
    ];

    return [columns, tableData];
  }, [tableData]);

  return (
    <Table
      columns={columns}
      records={data}
      apiResponse={apiResponse}
      isLoading={isLoading}
      setRecords={setTableData}
      exercise_slug={exercise_slug}
      isError={isError}
    />
  );
};

export default SubexercisesTable;

// import * as React from 'react';

// import {
//   VStack,
//   Text,
//   Table,
//   Thead,
//   Tbody,
//   Heading,
//   Tr,
//   Alert,
//   Th,
//   Td,
//   chakra,
//   AlertIcon,
//   Checkbox,
//   Box,
// } from '@chakra-ui/react';
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
// import {
//   useTable,
//   useSortBy,
//   useRowSelect,
//   useGlobalFilter,
// } from 'react-table';
// import axios from 'axios';
// import { BASE_API_URL } from '../../../common/contstants/base-api-url';
// import { useQuery } from 'react-query';
// import PropTypes from 'prop-types';
// import DeleteSelectedExercisesButton from './delete-selected-exercises-button';
// import EditExerciseButton from './edit-exercise-button';
// import Spinner from '../../../common/components/spinner';
// import NoExercisesPanel from './no-exercises-panel';

// const IndeterminateCheckbox = React.forwardRef(
//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef();
//     const resolvedRef = ref || defaultRef;

//     return <Checkbox isChecked={rest.checked} ref={resolvedRef} {...rest} />;
//   },
// );

// const getQuestions = async () => {
//   const res = await axios.get(`${BASE_API_URL}/api/exercises/`);

//   return res.data;
// };

// const ExercisesTable = ({ filter }) => {
//   const [tableData, setTableData] = React.useState([]);
//   const {
//     data: apiResponse,
//     isLoading,
//     isError,
//   } = useQuery(['exercises', 'dashboard'], () => getQuestions(), {
//     retry: 3,
//     retryDelay: 0,
//   });

//   React.useEffect(() => {
//     setTableData(apiResponse || []);
//   }, [apiResponse]);

//   React.useEffect(() => {
//     setGlobalFilter(filter);
//   }, [filter]);

//   const [columns, data] = React.useMemo(() => {
//     const columns = [
//       {
//         Header: 'Name',
//         accessor: 'exercise_name',
//       },
//       {
//         Header: 'Description',
//         accessor: 'description',
//       },
//       {
//         Header: 'Date Created',
//         accessor: 'created_at',
//         Cell: ({ cell }) => {
//           const date = new Date(cell.value);
//           return date.toDateString();
//         },
//       },
//       {
//         Header: '',
//         accessor: 'editButton',
//         Cell: ({ cell }) => <EditExerciseButton exercise={cell.row.original} />,
//         disableSortBy: true,
//       },
//     ];

//     return [columns, tableData];
//   }, [tableData]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     selectedFlatRows,
//     setGlobalFilter,
//   } = useTable(
//     { columns, data },
//     useGlobalFilter,
//     useSortBy,
//     useRowSelect,
//     (hooks) => {
//       hooks.visibleColumns.push((columns) => [
//         {
//           id: 'selection',
//           // eslint-disable-next-line react/display-name
//           Header: ({ getToggleAllRowsSelectedProps }) => (
//             <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
//           ),
//           // eslint-disable-next-line react/display-name
//           Cell: ({ row }) => (
//             <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
//           ),
//         },
//         ...columns,
//       ]);
//     },
//   );

//   return (
//     <VStack spacing="4">
//       {selectedFlatRows.length && (
//         <Alert status="warning">
//           <AlertIcon />

//           <Text>
//             You have selected {selectedFlatRows.length}{' '}
//             {selectedFlatRows.length > 1 ? 'items' : 'item'} to be permanently
//             deleted.{' '}
//             <DeleteSelectedExercisesButton selectedItems={selectedFlatRows} />
//           </Text>
//         </Alert>
//       )}
//       <Box overflowX="auto" w="full">
//         <Table {...getTableProps()}>
//           <Thead>
//             {headerGroups.map((headerGroup, idx) => (
//               <Tr key={idx} {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column, idx) => (
//                   <Th
//                     key={idx}
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                     isNumeric={column.isNumeric}>
//                     {column.render('Header')}
//                     <chakra.span pl="4">
//                       {column.isSorted ? (
//                         column.isSortedDesc ? (
//                           <TriangleDownIcon aria-label="sorted descending" />
//                         ) : (
//                           <TriangleUpIcon aria-label="sorted ascending" />
//                         )
//                       ) : null}
//                     </chakra.span>
//                   </Th>
//                 ))}
//               </Tr>
//             ))}
//           </Thead>
//           {!isLoading && data.length > 0 && (
//             <Tbody {...getTableBodyProps()}>
//               {rows.map((row, idx) => {
//                 prepareRow(row);
//                 return (
//                   <Tr key={idx} {...row.getRowProps()}>
//                     {row.cells.map((cell, idx) => (
//                       <Td
//                         key={idx}
//                         {...cell.getCellProps()}
//                         isNumeric={cell.column.isNumeric}>
//                         {cell.render('Cell')}
//                       </Td>
//                     ))}
//                   </Tr>
//                 );
//               })}
//             </Tbody>
//           )}
//         </Table>
//         {isError ? (
//           <VStack mt="8">
//             <Heading size="md" textAlign="center">
//               Sorry, something went wrong.
//             </Heading>{' '}
//             <Text textAlign="center">Could not fetch exercises data.</Text>
//           </VStack>
//         ) : isLoading ? (
//           <Spinner />
//         ) : apiResponse && apiResponse.length <= 0 ? (
//           <NoExercisesPanel />
//         ) : null}
//       </Box>
//     </VStack>
//   );
// };

// ExercisesTable.propTypes = {
//   exercise_slug: PropTypes.string,
//   filter: PropTypes.string,
// };

// export default ExercisesTable;
