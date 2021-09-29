import * as React from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import EditExerciseModal from './edit-exercise-modal';

const EditExerciseButton = ({ exercise, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        float="right"
        color="blue.400"
        size="sm"
        onClick={onOpen}
        variant="ghost"
        {...rest}>
        Edit
      </Button>
      <EditExerciseModal
        exercise={exercise}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export default EditExerciseButton;
