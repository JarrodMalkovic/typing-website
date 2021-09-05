import * as React from 'react';

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ButtonGroup,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const AddExerciseButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        bgColor="blue.400"
        color="white"
        onClick={onOpen}
        leftIcon={<AddIcon />}
        variant="solid">
        Add Question
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Exercise</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4">
              <FormControl>
                <FormLabel>Exercise Type</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Subexercise Type</FormLabel>
                <Select placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Question</FormLabel>
                <Input placeholder="First name" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button onClick={onClose}>Close</Button>
              <Button
                variant="solid"
                bgColor="blue.400"
                color="white"
                onClick={onClose}>
                Create Exercise
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddExerciseButton;