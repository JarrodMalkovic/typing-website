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

const SignupSchema = Yup.object({
  username: Yup.string()
    .min(2, 'Too short!')
    .max(20, 'Too long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

// Adapted from: https://chakra-templates.dev/forms/authentication
const SignupForm = () => {
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
              title: 'Account created.',
              description: "We've created your account for you.",
              status: 'success',
              position: 'top-right',
              duration: 9000,
              isClosable: true,
            });
            actions.setSubmitting(false);
          }, 1000);
        }}
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignupSchema}>
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={4}>
              <Field name='username'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.username && form.touched.username}>
                    <FormLabel>Username {console.log(form)}</FormLabel>
                    <Input {...field} id='username' type='text' />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
              <Field name='confirmPassword'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.confirmPassword &&
                      form.touched.confirmPassword
                    }>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input {...field} id='confirmPassword' type='password' />
                    <FormErrorMessage>
                      {form.errors.confirmPassword}
                    </FormErrorMessage>
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
                Sign up
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignupForm;
