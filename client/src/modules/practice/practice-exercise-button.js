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
  Spinner,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';

const isSubexerciseDisabled = (subexercises, subexercise, idx) => {
  if (subexercise.attempt) return false;
  if (subexercise.level === 1) return false;
  if (subexercises[idx - 1] && subexercises[idx - 1].attempt) return false;

  return true;
};

const getSubexercises = async (slug) => {
  const res = await axios.get(
    `${BASE_API_URL}/api/subexercises/exercise/${slug}/`,
  );

  return res.data;
};

const PracticeExerciseButton = ({ name, img, slug }) => {
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
            <Center>{name}</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="3">
              {isLoading || !data ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                data.map((subExercise, idx) => (
                  <Link
                    key={subExercise.subexercise_slug}
                    href={`/practice/${subExercise.subexercise_slug}`}>
                    <Button
                      disabled={isSubexerciseDisabled(data, subExercise, idx)}
                      width="100%">
                      {subExercise.subexercise_name}
                    </Button>
                  </Link>
                ))
              )}
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
  img: PropTypes.string,
  slug: PropTypes.string,
};

export default PracticeExerciseButton;
