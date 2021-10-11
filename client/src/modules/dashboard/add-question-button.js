import * as React from 'react';
import { useDisclosure, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddExerciseModal from './add-question-modal';

const AddExerciseButton = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bgColor="blue.400"
        color="white"
        onClick={onOpen}
        leftIcon={<AddIcon />}
        variant="solid"
        _hover={{
          bgColor: 'blue.500',
        }}
        {...props}>
        Add Question
      </Button>
      <AddExerciseModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default AddExerciseButton;
