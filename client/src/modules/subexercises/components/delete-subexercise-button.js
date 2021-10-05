import * as React from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import DeleteSubexerciseModal from './delete-subexercise-modal';

const DeleteSubexerciseButton = ({ subexercise, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        color="red.400"
        onClick={onOpen}
        variant="ghost"
        {...rest}>
        Delete
      </Button>
      <DeleteSubexerciseModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        subexercise={subexercise}
      />
    </>
  );
};

export default DeleteSubexerciseButton;
