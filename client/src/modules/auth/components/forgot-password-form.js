import * as React from 'react';
import * as Yup from 'yup';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

const ForgotPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

const ForgotPasswordForm = () => {
  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      w={{ base: 'sm', md: 'md' }}
      boxShadow={'lg'}
      p={8}>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgotPasswordSchema}>
        {() => (
          <Form>
            <Stack spacing={4}>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input {...field} id="email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Request Reset
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPasswordForm;
