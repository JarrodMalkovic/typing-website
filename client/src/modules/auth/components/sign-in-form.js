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
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import { useRouter } from 'next/router';

const SigninSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
});

// Adapted from: https://chakra-templates.dev/forms/authentication
const SigninForm = () => {
  const router = useRouter();
  const toast = useToast();

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      w={{ base: 'sm', md: 'md' }}
      boxShadow={'lg'}
      p={8}>
      <Formik
        onSubmit={(_, actions) => {
          setTimeout(() => {
            router.push('/practice');
            toast({
              title: 'Signed in.',
              description: 'You have successully signed in!',
              status: 'success',
              position: 'top-right',
              duration: 9000,
              isClosable: true,
            });
            actions.setSubmitting(false);
          }, 1000);
        }}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SigninSchema}>
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={4}>
              <Field name='email'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel>Email address</FormLabel>
                    <Input {...field} id='email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='password'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} id='password' type='password' />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                isLoading={isSubmitting}
                type='submit'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SigninForm;
