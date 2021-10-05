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
  Heading,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Spinner,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Container,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';

const isSubexerciseDisabled = (
  subexercises,
  currentSubexercise,
  currentIdx,
) => {
  let attemptedAllPreviousSubexercises = true;

  subexercises.forEach((subexercise, idx) => {
    if (idx >= currentIdx) return;
    if (!subexercise.attempt) {
      attemptedAllPreviousSubexercises = false;
    }
  });

  if (currentSubexercise.level === 1) return false;
  return !attemptedAllPreviousSubexercises;
};

const getSubexercises = async (slug) => {
  const res = await axios.get(
    `${BASE_API_URL}/api/subexercises/exercise/${slug}/completion/`,
  );

  return res.data;
};

const PracticeExerciseButton = ({ name, img, slug, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, isFetching } = useQuery(
    slug,
    () => getSubexercises(slug),
    {
      enabled: isOpen,
    },
  );

  return (
    <>
      <WrapItem paddingX="50px">
        <VStack onClick={onOpen} as="button">
          <Image src={img} boxSize="135px" />
          <Center>
            <Text mt="10px" width="130px" fontWeight="bold" fontSize="xl">
              {name}
            </Text>
          </Center>
        </VStack>
      </WrapItem>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack>
              <Heading>{name}</Heading>
              <Text fontSize="md">{description}</Text>
            </VStack>
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalCloseButton />
          <ModalBody>
            {isLoading || !data ? (
              <Center>
                <Spinner />
              </Center>
            ) : (
              <Accordion allowToggle>
                {data.map((subExercise, idx) => (
                  <AccordionItem
                    isDisabled={isSubexerciseDisabled(data, subExercise, idx)}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          {subExercise.subexercise_name}
                        </Box>

                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <Box textAlign="center" padding="0px 20px">
                        <Text>{subExercise.description}</Text>
                        <Link
                          href={`/practice/${subExercise.exercise_slug}/subexercise/${subExercise.subexercise_slug}`}>
                          <Button
                            width="50%"
                            flex="1"
                            textAlign="left"
                            justify
                            margin="10px"
                            _hover={{
                              color: 'teal.500',
                            }}>
                            Begin
                          </Button>
                        </Link>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
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
  img: PropTypes.string,
  slug: PropTypes.string,
};

// {/* <Link
//                   key={subExercise.subexercise_slug}
//                   href={`/practice/${subExercise.subexercise_slug}`}>
//                   <Button
//                     disabled={isSubexerciseDisabled(data, subExercise, idx)}
//                     width="100%">
//                     {subExercise.subexercise_name}
//                   </Button>
//                 </Link> */}

export default PracticeExerciseButton;
