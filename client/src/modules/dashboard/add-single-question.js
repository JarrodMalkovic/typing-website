import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  Input,
  FormControl,
  FormLabel,
  VStack,
  Select,
  ModalBody,
  useToast,
  ModalFooter,
  ButtonGroup,
  Button,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';
import AudioUpload from './audio-upload';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { isDictionSlug } from '../exercises/utils/is-diction-slug';
import { isDictionSubexercise } from '../exercises/utils/is-diction-subexercise';
import { useExercises } from '../exercises/hooks/use-exercises';
import { useSubexercises } from '../subexercises/hooks/use-subexercises';

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

const AddSingleQuestion = ({ onClose }) => {
  const [exercise, setExercise] = React.useState('');

  const { data: exercises, isLoading: isExercisesLoading } = useExercises();
  const { data: subexercises, isLoading: isSubexercisesLoading } =
    useSubexercises(exercise);

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading } = useMutation(addQuestion, {
    onSuccess: (data) => {
      const subexercise_name = subexercises.find(
        (subexercise) => subexercise.subexercise_slug === data.subexercise_slug,
      ).subexercise_name;

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
    <Formik
      initialValues={{
        subexercise_slug: '',
        question: '',
        translation: '',
        audio_file: null,
      }}
      onSubmit={mutate}
      validationSchema={validationSchema}>
      {({ values, setFieldValue }) => (
        <Form>
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
                    {isExercisesLoading ? (
                      <option>Loading</option>
                    ) : (
                      Object.entries(exercises).map(([key, value], idx) => (
                        <option key={idx} value={value.exercise_slug}>
                          {value.exercise_name}
                        </option>
                      ))
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
                        isDisabled={exercise === ''}
                        placeholder="Select subexercise">
                        {isSubexercisesLoading ? (
                          <h1>Loading</h1>
                        ) : (
                          subexercises.map((subexercise, idx) => (
                            <option
                              key={idx}
                              value={subexercise.subexercise_slug}>
                              {subexercise.subexercise_name}
                            </option>
                          ))
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
                      isInvalid={form.errors.question && form.touched.question}>
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

                <Field name="translation">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.translation && form.touched.translation
                      }>
                      <FormLabel>Translation</FormLabel>
                      <Input
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

                {exercise.length > 0
                  ? exercises.find((ex) => ex.exercise_slug === exercise)
                      .allow_audio_files_in_questions && (
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
                    )
                  : null}
              </Stack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup mt="4">
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
  );
};

export default AddSingleQuestion;
