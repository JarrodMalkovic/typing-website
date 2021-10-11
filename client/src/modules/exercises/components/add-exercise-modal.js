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
  Textarea,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import ImageUpload from './image-upload';
import { displayErrors } from '../../../common/utils/display-errors';

const validationSchema = Yup.object({
  exercise_name: Yup.string()
    .max(100)
    .required('Required')
    .matches(
      /^[\w\-\s]+$/,
      'Exercise names must only contain letters or numbers',
    ),
  description: Yup.string().max(500, 'Too long!').required('Required'),
  allow_in_challenge_mode: Yup.bool().required(),
  allow_audio_files_in_questions: Yup.bool().required(),
  hidden: Yup.bool().required(),
  image_file: Yup.mixed().required('Required'),
});

const addExercise = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach(
    (key) => data[key] != null && formData.append(key, data[key]),
  );

  const res = await axios.post(`${BASE_API_URL}/api/exercises/`, formData);

  return res.data;
};

const AddExerciseModal = ({ isOpen, onOpen, onClose }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading } = useMutation(addExercise, {
    onSuccess: (data) => {
      queryClient.setQueryData(['exercises', 'dashboard'], (old) => {
        return [...old, data];
      });

      toast({
        title: 'Added exercises.',
        description: 'You have successfully deleted the selected questions.',
        status: 'success',
        position: 'top-right',
        duration: 4000,
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
            exercise_name: '',
            description: '',
            allow_in_challenge_mode: true,
            allow_audio_files_in_questions: false,
            hidden: false,
            image_file: null,
          }}
          onSubmit={mutate}
          validationSchema={validationSchema}>
          {({ values, setFieldValue }) => (
            <Form>
              <ModalHeader>Create Exercise</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="4">
                  {isError && displayErrors(error)}
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
                            value={values.exercise_name}
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
                          <Textarea
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
                    <Field name="image_file">
                      {({ field, form }) => (
                        <FormControl isInvalid={form.errors.image_file}>
                          <FormLabel>Exercise Image</FormLabel>
                          <ImageUpload setFieldValue={setFieldValue} />
                          <FormErrorMessage>
                            {form.errors.image_file}
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
                    type="submit"
                    _hover={{
                      bgColor: 'blue.500',
                    }}>
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

AddExerciseModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default AddExerciseModal;
