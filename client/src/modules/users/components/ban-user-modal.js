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

const banUser = async (userId) => {
  const { data } = await axios.delete(
    `${BASE_API_URL}/api/user/${userId}/ban/`,
  );
  return data;
};

const BanUserModal = ({ isOpen, onClose, cancelRef, username, userId }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(() => banUser(userId), {
    onSuccess: () => {
      queryClient.setQueryData('users', (old) =>
        old.filter((oldRow) => oldRow.id !== userId),
      );
    },
  });

  return (
    <AlertDialog
      isCentered
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Ban "{username}"
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to permanently ban "{username}"? You can't
            undo this action afterwards.
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
              Ban "{username}"
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default BanUserModal;
