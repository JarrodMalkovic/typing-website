import * as React from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import BanUserModal from './ban-user-modal';

const BanUserButton = ({ username, userId, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        color="red.400"
        onClick={onOpen}
        {...rest}>
        Ban
      </Button>
      <BanUserModal
        isOpen={isOpen}
        onClose={onClose}
        username={username}
        userId={userId}
      />
    </>
  );
};

export default BanUserButton;
