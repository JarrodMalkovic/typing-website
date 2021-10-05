import * as React from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddSubexerciseModal from './add-subexercise-modal';
import EditSubexerciseModal from './edit-subexercise-modal';

const EditSubexerciseButtton = ({ subexercise, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="sm"
        color="blue.400"
        onClick={onOpen}
        variant="ghost"
        {...rest}>
        Edit
      </Button>
      <EditSubexerciseModal
        subexercise={subexercise}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

export default EditSubexerciseButtton;
