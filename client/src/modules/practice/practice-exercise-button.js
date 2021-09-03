import * as React from 'react';

import {
  VStack,
  Text,
  WrapItem,
  Button,
  Image,
  Modal,
  ModalOverlay,
  Box,
  Flex,
  Center,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  ModalHeader,
  useDisclosure,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';

import Link from 'next/link';

import PropTypes from 'prop-types';

const PracticeExerciseButton = ({ name,img, subExercises,dscrpt }) => {
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
          <ModalHeader fontSize = "30px">
            <Center>{name}</Center>
          </ModalHeader>
          <ModalBody>
            <Text textAlign = "center">{dscrpt}</Text>
          </ModalBody>
          <ModalCloseButton />
          <ModalBody>
            
            <VStack spacing="3">
              {subExercises.map((subExercise) => (
                <>
                  <Accordion 
                    allowMultiple 
                    allowToggle 
                    width="100%"
  >
                    <AccordionItem>
                      <h2>
                        <AccordionButton sx={{}}>
                          <Link href={`/practice/${subExercise.slug}`}>
                              <Button
                                disabled={subExercise.disabled} 
                                width="100%" 
                                flex = "1" 
                                textAlign = "left"
                                justify
                                _hover={{
                                  background: "white",
                                  color: "teal.500",
                                }}>
                                {subExercise.name}
                              </Button>
                          </Link>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>

                      <AccordionPanel pb={4} textAlign = "center">
                        {subExercise.description}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </> 
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
