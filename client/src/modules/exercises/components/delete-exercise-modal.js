import * as React from 'react';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogOverlay,
  Box,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react';

import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useMutation, useQueryClient } from 'react-query';
import { displayErrors } from '../../../common/utils/display-errors';

const deleteExercise = async (exercise_slug) => {
  const { data } = await axios.delete(
    `${BASE_API_URL}/api/exercises/${exercise_slug}/`,
  );

  return data;
};

const DeleteExerciseModal = ({ isOpen, onClose, cancelRef, exercise }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, error } = useMutation(
    () => deleteExercise(exercise.exercise_slug),
    {
      onSuccess: () => {
        queryClient.setQueryData(['exercises', 'dashboard'], (old) =>
          old.filter(
            (oldRow) => oldRow.exercise_slug !== exercise.exercise_slug,
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
            Delete "{exercise.exercise_name}"?
          </AlertDialogHeader>

          <AlertDialogBody>
            {isError && displayErrors(error)}
            Are you sure you want to permanently delete "
            {exercise.exercise_name}"? You can't undo this action afterwards.
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
              Delete "{exercise.exercise_name}"
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteExerciseModal;
