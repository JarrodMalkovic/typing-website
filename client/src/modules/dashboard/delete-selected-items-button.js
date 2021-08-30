import * as React from 'react';

import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
  Text,
  AlertDialogContent,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

const DeleteSelectedItemsButton = ({ selectedItems }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  console.log(selectedItems);

  return (
    <>
      <Button onClick={onOpen} colorScheme="white" variant="link">
        Delete Selected {selectedItems.length > 1 ? 'Items' : 'Item'}.
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {selectedItems.length}{' '}
              {selectedItems.length > 1 ? 'items' : 'item'}
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>
                Are you sure? This will delete the following{' '}
                {selectedItems.length > 1 ? 'items' : 'item'}:
              </Text>
              <UnorderedList>
                {selectedItems.map((item, idx) => (
                  <ListItem key={idx}>
                    {item.original.subexercise} - {item.original.question}
                  </ListItem>
                ))}
              </UnorderedList>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

DeleteSelectedItemsButton.propTypes = {
  selectedItems: PropTypes.array,
};

export default DeleteSelectedItemsButton;
