import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  Input,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
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
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { displayErrors } from '../../../common/utils/display-errors';

const validationSchema = Yup.object({
  subexercise_name: Yup.string().max(100).required('Required'),
  description: Yup.string().max(500, 'Too long!').required('Required'),
});

const editSubexercise = async (data, subexercise_slug) => {
  const res = await axios.patch(
    `${BASE_API_URL}/api/subexercises/subexercise/${subexercise_slug}/`,
    data,
  );

  return res.data;
};

const EditSubexerciseModal = ({ isOpen, onClose, subexercise }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isError, error, isLoading } = useMutation(
    (data) => editSubexercise(data, subexercise.subexercise_slug),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          ['subexercise', 'dashboard', subexercise.exercise_slug],
          (old) => {
            return [...old, data];
          },
        );

        toast({
          title: 'Edited subexercise.',
          description: 'You have successfully edited the subexercise.',
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
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            subexercise_name: subexercise.subexercise_name,
            description: subexercise.description,
          }}
          enableReinitialize={true}
          onSubmit={mutate}
          validationSchema={validationSchema}>
          {({ values, setFieldValue }) => (
            <Form>
              <ModalHeader>Edit Subexercise</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing="4">
                  {isError && displayErrors(error)}
                  <Stack spacing={4} w="full">
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
                          <Textarea
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
                    type="submit"
                    _hover={{
                      bgColor: 'blue.500',
                    }}>
                    Edit Subexercise
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

EditSubexerciseModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default EditSubexerciseModal;
