import React from 'react';
import { useTable } from 'react-table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
  Table as ChakraTable,
  Th,
  Tr,
  Td,
  Button,
  Tbody,
  Thead,
} from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';

console.log(HTML5Backend);

const Table = ({ columns, data }) => {
  const [records, setRecords] = React.useState(data);

  const getRowId = React.useCallback((row) => {
    return row.id;
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      data: records,
      columns,
      getRowId,
    });

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      }),
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ChakraTable {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              <Th />
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
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
    </DndProvider>
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
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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

const SubexercisesTable = () => {
  const columns = React.useMemo(
    () => [
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
        accessor: 'date_created',
      },

      {
        Header: '',
        accessor: 'editButton',
        Cell: ({ cell }) => (
          <Button float="right" variant="ghost" size="sm" color="blue.400">
            Edit
          </Button>
        ),
        disableSortBy: true,
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        id: 1,
        subexercise_name: 'Placeholder Subexercise 1',
        description: 'Placeholder Description 1',
        date_created: '25/20/2021',
      },
      {
        id: 2,
        subexercise_name: 'Placeholder Subexercise 2',
        description: 'Placeholder Description 2',
        date_created: '25/20/2021',
      },

      {
        id: 3,
        subexercise_name: 'Placeholder Subexercise 3',
        description: 'Placeholder Description 3',
        date_created: '25/20/2021',
      },
      {
        id: 4,
        subexercise_name: 'Placeholder Subexercise 4',
        description: 'Placeholder Description 4',
        date_created: '25/20/2021',
      },
    ],
    [],
  );

  return <Table columns={columns} data={data} />;
};

export default SubexercisesTable;
