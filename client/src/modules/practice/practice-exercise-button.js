import * as React from 'react';

import {
  VStack,
  HStack,
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
          
          <Container padding = "20px" maxW="container.lg" _hover={{
                                  color: "teal.500",
                                }}>
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
            <Box textAlign = "center" padding = "0px 20px">{dscrpt}</Box>
          </ModalBody>
          <ModalCloseButton />
          <ModalBody>
            
            <VStack margin = "10px">
              {subExercises.map((subExercise) => (
                <>
                  <Accordion 
                    allowMultiple
                    allowToggle 
                    width="90%"
                    >
                    <AccordionItem>  

                      <h2>
                        <AccordionButton width="100%">
                          <Box flex="1" textAlign="left" fontWeight = "bold">
                            {subExercise.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                        
                     

                      <AccordionPanel pb={4} textAlign = "center">
                        
                        <Box textAlign = "center" padding = "0px 20px">{subExercise.description}</Box>
                        

                        <Link href={`/practice/${subExercise.slug}`}>
                              <Button
                                disabled={subExercise.disabled} 
                                width="50%" 
                                flex = "1" 
                                textAlign = "left"
                                justify
                                margin = "10px"
                                _hover={{
                                  color: "teal.500",
                                }}>
                                Begin
                              </Button>
                          </Link>

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
