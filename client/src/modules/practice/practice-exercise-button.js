import * as React from 'react';

import {
  VStack,
  Text,
  WrapItem,
  Button,
  Image,
  Modal,
  ModalOverlay,
  Center,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  ModalHeader,
  useDisclosure,
} from '@chakra-ui/react';

import Link from 'next/link';

import PropTypes from 'prop-types';

const PracticeExerciseButton = ({ name, subExercises }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <WrapItem onClick={onOpen} as="button">
        <VStack>
          <Image
            borderRadius="full"
            boxSize="150px"
            src="https://via.placeholder.com/150"
          />
          <Text color={useColorModeValue('gray.600', 'gray.200')}>{name}</Text>
        </VStack>
      </WrapItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>{name}</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="3">
              {subExercises.map((subExercise) => (
                <Link
                  key={subExercise.slug}
                  href={`/practice/${subExercise.slug}`}>
                  <Button disabled={subExercise.disabled} width="100%">
                    {subExercise.name}
                  </Button>
                </Link>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

PracticeExerciseButton.propTypes = {
  name: PropTypes.string,
  subExercises: PropTypes.array,
};

export default PracticeExerciseButton;
