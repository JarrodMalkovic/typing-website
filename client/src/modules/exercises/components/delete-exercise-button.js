import * as React from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import DeleteExerciseModal from './delete-exercise-modal';

const DeleteExerciseButton = ({ exercise, ...rest }) => {
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
      <DeleteExerciseModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        exercise={exercise}
      />
    </>
  );
};

export default DeleteExerciseButton;
