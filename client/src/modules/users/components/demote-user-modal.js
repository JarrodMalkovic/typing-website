import * as React from 'react';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useMutation, useQueryClient } from 'react-query';
import { getRelatedCacheKeys } from '../../../common/utils/get-related-cache-keys';

const demoteUser = async (userId) => {
  const { data } = await axios.patch(
    `${BASE_API_URL}/api/user/${userId}/demote/`,
  );
  return data;
};

const DemoteUserModal = ({ username, userId, isOpen, onClose, finalRef }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(() => demoteUser(userId), {
    onSuccess: (data) => {
      const keys = getRelatedCacheKeys(queryClient, 'users');

      keys.forEach((key) =>
        queryClient.setQueryData(key, (old) => {
          return {
            ...old,
            users: old.users.map((oldRow) =>
              oldRow.id === userId ? data : oldRow,
            ),
          };
        }),
      );

      onClose();
    },
  });

  return (
    <Modal
      isCentered
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Demote "{username}"</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to demote "{username}"?</ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              isLoading={isLoading}
              variant="solid"
              bgColor="blue.400"
              color="white"
              type="submit"
              onClick={mutate}>
              Demote "{username}"
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

DemoteUserModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  finalRef: PropTypes.object,
};

export default DemoteUserModal;
