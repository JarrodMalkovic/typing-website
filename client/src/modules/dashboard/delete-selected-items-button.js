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
  useToast,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import { useMutation, useQueryClient } from 'react-query';
import { displayErrors } from '../../common/utils/display-errors';

const deleteQuestions = async (selectedItems) => {
  const res = await axios.delete(`${BASE_API_URL}/api/questions/`, {
    data: { questions: selectedItems.map((item) => item.original.id) },
  });

  return res.data;
};

const DeleteSelectedItemsButton = ({ exercise_slug, selectedItems }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = React.useRef();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation(
    () => deleteQuestions(selectedItems),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['dashboard', exercise_slug], (old) => {
          const deletedQuestionIdsSet = new Set(data);

          return old.filter(
            (oldQuestion) => !deletedQuestionIdsSet.has(oldQuestion.id),
          );
        });

        toast({
          title: `Deleted question${selectedItems.length > 1 ? 's' : ''}.`,
          description: `You have successfully deleted the selected question${
            selectedItems.length > 1 ? 's' : ''
          }.`,
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });

        onClose();
      },
    },
  );

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
            {isError && (
              <AlertDialogHeader
                fontSize="md"
                fontWeight="normal"
                pb="0"
                mb="0">
                {displayErrors(error)}
              </AlertDialogHeader>
            )}
            <AlertDialogHeader
              pt={isError ? '0' : '6'}
              fontSize="lg"
              fontWeight="bold">
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
                    {item.original.subexercise_slug.subexercise_name} -{' '}
                    {item.original.question}
                  </ListItem>
                ))}
              </UnorderedList>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                isLoading={isLoading}
                onClick={mutate}
                ml={3}>
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
  exercise_slug: PropTypes.string,
};

export default DeleteSelectedItemsButton;
