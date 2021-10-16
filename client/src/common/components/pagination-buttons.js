import * as React from 'react';

import {
  Text,
  Flex,
  Tooltip,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';

// Adapted from: https://codesandbox.io/s/fxx0v
const PaginationButtons = ({
  canPreviousPage,
  previousPage,
  pageIndex,
  pageOptions,
  pageSize,
  nextPage,
  canNextPage,
  pageCount,
  setPageSize,
  gotoPage,
}) => {
  return (
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
  );
};

export default PaginationButtons;
