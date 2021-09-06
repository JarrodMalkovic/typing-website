import * as React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ButtonGroup,
  ModalCloseButton,
  Stack,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  useToast,
  FormErrorMessage,
  FormLabel,
  VStack,
  Select,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import { useMutation, useQueryClient } from 'react-query';
import { exercises } from '../../common/contstants/exercises';
import PropTypes from 'prop-types';

const validationSchema = Yup.object({
  subexercise_slug: Yup.string().required('Required!'),
  question: Yup.string().required('Required!').max(100),
});

const editQuestion = async (data, questionId) => {
  const res = await axios.put(
    `${BASE_API_URL}/api/questions/${questionId}/`,
    data,
  );

  return res.data;
};

const EditQuestionButton = ({ row, exercise }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading } = useMutation(
    (data) => editQuestion(data, row.id),
    {
      onSuccess: (data) => {
        const subexercise_name = exercises[exercise].subexercises.find(
          (subexercise) => subexercise.slug === data.subexercise_slug,
        ).name;

        queryClient.setQueryData(exercise, (old) =>
          old.map((oldRow) =>
            oldRow.id === row.id
              ? {
                  ...oldRow,
                  ...data,
                  subexercise_slug: {
                    subexercise_name,
                    subexercise_slug: data.exercise_slug,
                  },
                }
              : oldRow,
          ),
        );

        toast({
          title: 'Edited Question',
          description: 'You have successfully edited a question',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });

        onClose();
      },
    },
  );

  return (
    <>
      <Button
        onClick={onOpen}
        size="sm"
        variant="ghost"
        color="blue.400"
        float="right">
        Edit
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{
              subexercise_slug: row.subexercise_slug['subexercise_slug'],
              question: row.question,
            }}
            onSubmit={mutate}
            validationSchema={validationSchema}>
            {({ values }) => (
              <Form>
                <ModalHeader>Edit Question</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing="4">
                    {isError && <h1>{JSON.stringify(error)}</h1>}
                    <Stack spacing={4} w="full">
                      <FormControl>
                        <FormLabel>Exercise Type</FormLabel>
                        <Select
                          isDisabled={true}
                          value={exercise}
                          placeholder="Select exercise">
                          {Object.entries(exercises).map(
                            ([key, value], idx) => (
                              <option key={idx} value={value.slug}>
                                {value.name}
                              </option>
                            ),
                          )}
                        </Select>
                      </FormControl>
                      <Field name="subexercise_slug" as="select">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.subexercise_slug &&
                              form.touched.subexercise_slug
                            }>
                            <FormLabel>Subexercise Type</FormLabel>
                            <Select
                              {...field}
                              isDisabled={exercise == ''}
                              placeholder="Select subexercise">
                              {exercises[exercise] &&
                                exercises[exercise].subexercises.map(
                                  (subexercise, idx) => (
                                    <option key={idx} value={subexercise.slug}>
                                      {subexercise.name}
                                    </option>
                                  ),
                                )}
                            </Select>
                            <FormErrorMessage>
                              {form.errors.subexercise_slug}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="question">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.question && form.touched.question
                            }>
                            <FormLabel>Question</FormLabel>
                            <Input
                              {...field}
                              id="question"
                              placeholder="Enter question"
                              value={values.question}
                            />
                            <FormErrorMessage>
                              {form.errors.question}
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
                      Create Exercise
                    </Button>
                  </ButtonGroup>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

EditQuestionButton.propTypes = {
  row: PropTypes.object,
  exercise: PropTypes.string,
};

export default EditQuestionButton;
