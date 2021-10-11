import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  FormControl,
  FormLabel,
  VStack,
  Select,
  ModalBody,
  useToast,
  ModalFooter,
  Textarea,
  ButtonGroup,
  Button,
  FormErrorMessage,
  Stack,
} from '@chakra-ui/react';
import AudioUpload from './audio-upload';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import { useExercises } from '../exercises/hooks/use-exercises';
import { useSubexercises } from '../subexercises/hooks/use-subexercises';
import { displayErrors } from '../../common/utils/display-errors';
import Spinner from '../../common/components/spinner';

const addQuestion = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach(
    (key) => data[key] != null && formData.append(key, data[key]),
  );

  const res = await axios.post(`${BASE_API_URL}/api/questions/`, formData);
  return res.data;
};

const AddSingleQuestion = ({ onClose }) => {
  const [exercise, setExercise] = React.useState('');
  const [subexercise, setSubexercise] = React.useState('');

  const { data: exercises, isLoading: isExercisesLoading } = useExercises();
  const { data: subexercises, isLoading: isSubexercisesLoading } =
    useSubexercises(exercise);

  const toast = useToast();
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    subexercise_slug: Yup.string().required('Required!'),
    question: Yup.string().required('Required!').max(500),
    translation: Yup.string().required('Required!').max(500),
    audio_file: Yup.mixed().when(
      ['subexercise_slug'],
      (subexercise_slug, schema) =>
        exercise.length > 0 &&
        exercises.find((ex) => ex.exercise_slug === exercise)
          .allow_audio_files_in_questions
          ? schema.required('Required!')
          : schema,
    ),
  });

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
        duration: 4000,
        isClosable: true,
      });

      onClose();
    },
  });

  const handleChange = (event, setFieldValue) => {
    setExercise(event.target.value);
    setFieldValue('subexercise_slug', '');
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
      enableReinitialize={true}
      validationSchema={validationSchema}>
      {({ values, setFieldValue }) => (
        <Form>
          <ModalBody>
            <VStack spacing="4">
              <Stack spacing={4} w="full">
                <FormControl>
                  {isError && displayErrors(error)}
                  <FormLabel>Exercise Type</FormLabel>
                  <Select
                    onChange={(e) => handleChange(e, setFieldValue)}
                    value={exercise}
                    placeholder="Select exercise">
                    {isExercisesLoading || !exercises ? (
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
                        {isSubexercisesLoading || !subexercises ? (
                          <Spinner />
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
                        form.errors.translation && form.touched.translation
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
                type="submit"
                _hover={{
                  bgColor: 'blue.500',
                }}>
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
