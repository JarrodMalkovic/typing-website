import * as React from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import PromoteUserModal from './promote-user-modal';

const PromoteUserButton = ({ username, userId, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        color="blue.400"
        onClick={onOpen}
        {...rest}>
        Promote
      </Button>
      <PromoteUserModal
        username={username}
        userId={userId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default PromoteUserButton;
