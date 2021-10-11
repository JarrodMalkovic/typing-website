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
  Tbody,
  Thead,
  ButtonGroup,
} from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import EditSubexerciseButtton from './edit-subexercise-button';
import DeleteSubexerciseButton from './delete-subexercise-button';
import Spinner from '../../../common/components/spinner';
import NoSubexercisesPanel from './no-subexercises-panel';

const reorderSubexercises = async ({ body, exercise_slug }) => {
  const { data } = await axios.patch(
    `${BASE_API_URL}/api/subexercises/exercise/${exercise_slug}/reorder/`,
    body,
  );

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
    return row.subexercise_slug;
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
        return { subexercise_slug: row.subexercise_slug, level: idx + 1 };
      })
      .reduce(
        (obj, item) =>
          Object.assign(obj, {
            [item.subexercise_slug]: { level: item.level },
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

const getSubexercises = async (exercise_slug) => {
  const { data } = await axios.get(
    `${BASE_API_URL}/api/subexercises/exercise/${exercise_slug}/`,
  );

  return data;
};

const SubexercisesTable = ({ exercise_slug }) => {
  const [tableData, setTableData] = React.useState([]);
  const {
    data: apiResponse,
    isLoading,
    isError,
  } = useQuery(
    ['subexercise', 'dashboard', exercise_slug],
    () => getSubexercises(exercise_slug),
    { retry: 3, retryDelay: 0 },
  );

  React.useEffect(() => {
    setTableData(apiResponse || []);
  }, [apiResponse, isLoading]);

  const [columns, data] = React.useMemo(() => {
    const columns = [
      {
        Header: 'Name',
        accessor: 'subexercise_name',
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
            <EditSubexerciseButtton subexercise={cell.row.original} />
            <DeleteSubexerciseButton subexercise={cell.row.original} />
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
