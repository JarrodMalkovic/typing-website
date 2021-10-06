import * as React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';

import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useMutation, useQueryClient } from 'react-query';

const deleteSubexercise = async (subexercise_slug) => {
  console.log('x');

  const { data } = await axios.delete(
    `${BASE_API_URL}/api/subexercises/subexercise/${subexercise_slug}/`,
  );

  return data;
};

const DeleteSubexerciseModal = ({
  isOpen,
  onClose,
  cancelRef,
  subexercise,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    () => deleteSubexercise(subexercise.subexercise_slug),
    {
      onSuccess: () => {
        queryClient.setQueryData(
          ['subexercise', 'dashboard', subexercise.exercise_slug],
          (old) =>
            old.filter(
              (oldRow) =>
                oldRow.subexercise_slug !== subexercise.subexercise_slug,
            ),
        );
      },
    },
  );

  return (
    <AlertDialog
      isCentered
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete "{subexercise.subexercise_name}"?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to permanently delete "
            {subexercise.subexercise_name}"? You can't undo this action
            afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={mutate}
              isLoading={isLoading}>
              Delete "{subexercise.subexercise_name}"
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteSubexerciseModal;
