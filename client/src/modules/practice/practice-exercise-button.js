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
  Container,
} from '@chakra-ui/react';

import Link from 'next/link';

import PropTypes from 'prop-types';

const PracticeExerciseButton = ({ name,img, subExercises }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <WrapItem onClick={onOpen} as="button">
        <VStack>
          
          <Container padding = "20px" maxW="container.lg">
            <Image src = {img} boxSize="150px"/>
            <Text mt="10px" fontWeight =  "bold" fontSize = "xl">{name}</Text>
          </Container>
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
