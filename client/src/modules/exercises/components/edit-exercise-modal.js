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

const validationSchema = Yup.object({});

const editExercise = async (data, exercise_slug) => {
  const formData = new FormData();

  console.log(data);

  Object.keys(data).forEach(
    (key) => data[key] && formData.append(key, data[key]),
  );

  const res = await axios.patch(
    `${BASE_API_URL}/api/exercises/${exercise_slug}/`,
    formData,
  );

  return res.data;
};

const EditExerciseModal = ({ exercise, isOpen, onOpen, onClose }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  console.log(exercise);

  const { mutate, isError, error, isLoading } = useMutation(
    (data) => editExercise(data, exercise.exercise_slug),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['exercises', 'dashboard'], (old) => {
          return old.map((oldExercise) =>
            oldExercise.exercise_slug === exercise.exercise_slug
              ? { ...oldExercise, ...data }
              : oldExercise,
          );
        });

        toast({
          title: 'Edited exercises.',
          description: 'You have successfully deleted the selected questions.',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      },
    },
  );

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            exercise_name: exercise.exercise_name,
            description: exercise.description,
            allow_in_challenge_mode: exercise.allow_in_challenge_mode,
            allow_audio_files_in_questions:
              exercise.allow_audio_files_in_questions,
            hidden: exercise.hidden,
          }}
          onSubmit={mutate}
          validationSchema={validationSchema}>
          {({ values, setFieldValue }) => (
            <Form>
              <ModalHeader>Edit Exercise</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="4">
                  {isError && <h1>{JSON.stringify(error)}</h1>}
                  <Stack spacing={4} w="full">
                    <Field name="exercise_name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.exercise_name &&
                            form.touched.exercise_name
                          }>
                          <FormLabel>Exercise Name</FormLabel>
                          <Input
                            {...field}
                            id="exercise_name"
                            placeholder="Enter exercise name"
                            isChecked={values.exercise_name}
                          />
                          <FormErrorMessage>
                            {form.errors.exercise_name}
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
                          <FormLabel>Exercise Description</FormLabel>
                          <Input
                            {...field}
                            id="description"
                            placeholder="Enter exercise description"
                            value={values.description}
                          />
                          <FormErrorMessage>
                            {form.errors.description}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="allow_in_challenge_mode">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.allow_in_challenge_mode &&
                            form.touched.allow_in_challenge_mode
                          }>
                          <Checkbox
                            {...field}
                            id="allow_in_challenge_mode"
                            isChecked={values.allow_in_challenge_mode}
                            onChange={(e) =>
                              setFieldValue(
                                'allow_in_challenge_mode',
                                e.target.checked,
                              )
                            }>
                            Allow in Challenge Mode
                          </Checkbox>

                          <FormErrorMessage>
                            {form.errors.allow_in_challenge_mode}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="allow_audio_files_in_questions">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.allow_audio_files_in_questions &&
                            form.touched.allow_audio_files_in_questions
                          }>
                          <Checkbox
                            {...field}
                            id="allow_audio_files_in_questions"
                            isChecked={values.allow_audio_files_in_questions}
                            onChange={(e) =>
                              setFieldValue(
                                'allow_audio_files_in_questions',
                                e.target.checked,
                              )
                            }>
                            Allow audio files in questions
                          </Checkbox>

                          <FormErrorMessage>
                            {form.errors.allow_audio_files_in_questions}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="hidden">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.hidden && form.touched.hidden}>
                          <Checkbox
                            {...field}
                            id="hidden"
                            isChecked={values.hidden}
                            onChange={(e) =>
                              setFieldValue('hidden', e.target.checked)
                            }>
                            Hidden
                          </Checkbox>

                          <FormErrorMessage>
                            {form.errors.hidden}
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
  );
};

EditExerciseModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default EditExerciseModal;
