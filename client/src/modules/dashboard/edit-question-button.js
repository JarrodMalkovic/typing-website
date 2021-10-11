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
  Textarea,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import { useMutation, useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import { displayErrors } from '../../common/utils/display-errors';

const validationSchema = Yup.object({
  subexercise_slug: Yup.string().required('Required!'),
  question: Yup.string().required('Required!').max(500),
  translation: Yup.string().required('Required!').max(500),
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
        queryClient.setQueryData(['dashboard', exercise], (old) =>
          old.map((oldRow) =>
            oldRow.id === row.id
              ? {
                  ...oldRow,
                  ...data,
                  subexercise_slug: { ...oldRow.subexercise_slug },
                }
              : oldRow,
          ),
        );

        toast({
          title: 'Edited Question',
          description: 'You have successfully edited a question',
          status: 'success',
          position: 'top-right',
          duration: 4000,
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
            onSubmit={mutate}
            initialValues={{
              subexercise_slug: row.subexercise_slug['subexercise_slug'],
              question: row.question,
              translation: row.translation,
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}>
            {({ values }) => (
              <Form>
                <ModalHeader>Edit Question</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing="4">
                    {isError && displayErrors(error)}
                    <Stack spacing={4} w="full">
                      <Field name="question">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.question && form.touched.question
                            }>
                            <FormLabel>Question</FormLabel>
                            <Textarea
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
                      <Field name="translation">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.translation &&
                              form.touched.translation
                            }>
                            <FormLabel>Translation</FormLabel>
                            <Textarea
                              {...field}
                              id="translation"
                              placeholder="Enter translation"
                              value={values.translation}
                            />
                            <FormErrorMessage>
                              {form.errors.translation}
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
                      type="submit"
                      variant="solid"
                      bgColor="blue.400"
                      color="white"
                      _hover={{
                        bgColor: 'blue.500',
                      }}>
                      Edit Question
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
