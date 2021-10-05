import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  Input,
  FormControl,
  FormLabel,
  Checkbox,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  HStack,
  ModalBody,
  Select,
  useToast,
  ModalFooter,
  ButtonGroup,
  Button,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { useExercises } from '../../exercises/hooks/use-exercises';

const validationSchema = Yup.object({});

const addSubexercise = async (data) => {
  const res = await axios.post(`${BASE_API_URL}/api/subexercises/`, {
    ...data,
    subexercise_slug: data.subexercise_name.toLowerCase().split(' ').join('-'),
  });

  return res.data;
};

const AddSubexerciseModal = ({ isOpen, onOpen, onClose }) => {
  const { data: exercises, isLoading: isExercisesLoading } = useExercises();

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading } = useMutation(addSubexercise, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['subexercise', 'dashboard', data.exercise_slug],
        (old) => {
          return [...old, data];
        },
      );

      toast({
        title: 'Added exercises.',
        description: 'You have successfully deleted the selected questions.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });

      onClose();
    },
  });

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            exercise_slug: '',
            subexercise_name: '',
            description: '',
            level: 0,
          }}
          onSubmit={mutate}
          validationSchema={validationSchema}>
          {({ values, setFieldValue }) => (
            <Form>
              <ModalHeader>Create Subexercise</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="4">
                  {isError && <h1>{JSON.stringify(error)}</h1>}
                  <Stack spacing={4} w="full">
                    <Field name="exercise_slug" as="select">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.exercise_slug &&
                            form.touched.exercise_slug
                          }>
                          <FormLabel>Exercise Type</FormLabel>
                          <Select {...field} placeholder="Select exercise">
                            {isExercisesLoading
                              ? null
                              : Object.entries(exercises).map(
                                  ([key, value], idx) => (
                                    <option
                                      key={idx}
                                      value={value.exercise_slug}>
                                      {value.exercise_name}
                                    </option>
                                  ),
                                )}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.exercise_slug}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="subexercise_name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.subexercise_name &&
                            form.touched.subexercise_name
                          }>
                          <FormLabel>Subexercise Name</FormLabel>
                          <Input
                            {...field}
                            id="subexercise_name"
                            placeholder="Enter subexercise name"
                            value={values.subexercise_name}
                          />
                          <FormErrorMessage>
                            {form.errors.subexercise_name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.description && form.touched.description
                          }>
                          <FormLabel>Subexercise Description</FormLabel>
                          <Input
                            {...field}
                            id="description"
                            placeholder="Enter subexercise description"
                            value={values.description}
                          />
                          <FormErrorMessage>
                            {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button
                    isLoading={isLoading}
                    variant="solid"
                    bgColor="blue.400"
                    color="white"
                    type="submit">
                    Create Subexercise
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

AddSubexerciseModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default AddSubexerciseModal;
