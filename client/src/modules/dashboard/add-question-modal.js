import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  Input,
  FormControl,
  FormLabel,
  VStack,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  ModalFooter,
  ButtonGroup,
  Button,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';
import { exercises } from '../../common/contstants/exercises';
import AudioUpload from './audio-upload';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { isDictionSlug } from '../exercises/utils/is-diction-slug';
import { isDictionSubexercise } from '../exercises/utils/is-diction-subexercise';

const validationSchema = Yup.object({
  subexercise_slug: Yup.string().required('Required!'),
  question: Yup.string().required('Required!').max(100),
  audio_file: Yup.mixed().when(
    ['subexercise_slug'],
    (subexercise_slug, schema) =>
      isDictionSubexercise(subexercise_slug)
        ? schema.required('Required!')
        : schema,
  ),
});

const addQuestion = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach(
    (key) => data[key] && formData.append(key, data[key]),
  );

  const res = await axios.post(`${BASE_API_URL}/api/questions/`, formData);
  return res.data;
};

const AddQuestionModal = ({ isOpen, onOpen, onClose }) => {
  const [exercise, setExercise] = React.useState('');
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading } = useMutation(addQuestion, {
    onSuccess: (data) => {
      const subexercise_name = exercises[exercise].subexercises.find(
        (subexercise) => subexercise.slug === data.subexercise_slug,
      ).name;

      queryClient.setQueryData(['dashboard', exercise], (old) =>
        Array.isArray(old)
          ? [
              ...old,
              {
                ...data,
                subexercise_slug: {
                  subexercise_name,
                  subexercise_slug: data.subexercise_slug,
                },
              },
            ]
          : [
              {
                ...data,
                subexercise_slug: {
                  subexercise_name,
                  subexercise_slug: data.subexercise_slug,
                },
              },
            ],
      );

      toast({
        title: 'Created Question',
        description: 'You have successfully created a new question',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });

      onClose();
    },
  });

  const handleChange = (event) => {
    setExercise(event.target.value);
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            subexercise_slug: '',
            question: '',
            audio_file: null,
          }}
          onSubmit={mutate}
          validationSchema={validationSchema}>
          {({ values, setFieldValue }) => (
            <Form>
              <ModalHeader>Create Question</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="4">
                  {isError && <h1>{JSON.stringify(error)}</h1>}
                  <Stack spacing={4} w="full">
                    <FormControl>
                      <FormLabel>Exercise Type</FormLabel>
                      <Select
                        onChange={handleChange}
                        value={exercise}
                        placeholder="Select exercise">
                        {Object.entries(exercises).map(([key, value], idx) => (
                          <option key={idx} value={value.slug}>
                            {value.name}
                          </option>
                        ))}
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
                            isDisabled={exercise === ''}
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
                    {isDictionSlug(exercise) && (
                      <Field name="audio_file">
                        {({ field, form }) => (
                          <FormControl isInvalid={form.errors.audio_file}>
                            <AudioUpload setFieldValue={setFieldValue} />
                            <FormErrorMessage>
                              {form.errors.audio_file}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    )}
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
                    Create Question
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

AddQuestionModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default AddQuestionModal;
