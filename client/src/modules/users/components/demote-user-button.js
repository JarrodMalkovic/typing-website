import * as React from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import DemoteUserModal from './demote-user-modal';

const DemoteUserButton = ({ username, userId, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        color="blue.400"
        onClick={onOpen}
        {...rest}>
        Demote
      </Button>
      <DemoteUserModal
        isOpen={isOpen}
        username={username}
        userId={userId}
        onClose={onClose}
      />
    </>
  );
};

export default DemoteUserButton;
