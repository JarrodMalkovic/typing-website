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
  useColorModeValue,
  Center,
  Heading,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
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
import Spinner from '../../common/components/spinner';
import NoSubexercisesPanel from '../exercises/components/no-subexercises-panel';

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
  const { data, isLoading, isError } = useQuery(
    slug,
    () => getSubexercises(slug),
    {
      enabled: isOpen,
      retryDelay: 0,
      retry: 3,
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

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered>
        <ModalOverlay px="0" mx="0" />
        <ModalContent>
          <ModalHeader>
            <VStack>
              <Heading>{name}</Heading>
              <Text fontSize="md">{description}</Text>
            </VStack>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            {isError ? (
              <Text textAlign="center">
                There was an error getting subexercises for this exercise
              </Text>
            ) : isLoading ? (
              <Spinner />
            ) : !data || !data.length ? (
              <NoSubexercisesPanel />
            ) : (
              <Accordion allowToggle>
                {data.map((subExercise, idx) => (
                  <AccordionItem
                    isDisabled={isSubexerciseDisabled(data, subExercise, idx)}>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Level {idx + 1} - {subExercise.subexercise_name}
                        </Box>

                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>
                      <Box textAlign="center" padding="0px 20px">
                        <Text color={useColorModeValue('gray.600', 'gray.300')}>
                          {subExercise.description}
                        </Text>

                        <Link
                          href={`/practice/${subExercise.exercise_slug}/subexercise/${subExercise.subexercise_slug}`}>
                          <a>
                            <Button
                              maxW="80"
                              h="auto"
                              py="2"
                              whiteSpace="initial"
                              variant="ghost"
                              color="blue.400"
                              textAlign="center"
                              margin="10px">
                              Start {subExercise.subexercise_name}
                            </Button>
                          </a>
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
