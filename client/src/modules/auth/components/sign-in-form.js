import * as React from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useMutation } from 'react-query';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Alert,
  AlertIcon,
  useToast,
  Link,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import NavLink from 'next/link';
import { useRouter } from 'next/router';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useAuth } from '../hooks/use-auth';

const SigninSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
});

const SignIn = async (data) => {
  const res = await axios.post(`${BASE_API_URL}/api/auth/login/`, data);
  return res.data;
};

// Adapted from: https://chakra-templates.dev/forms/authentication
const SigninForm = () => {
  const router = useRouter();
  const toast = useToast();
  const { dispatch } = useAuth();

  const { mutate, isError, error, isLoading } = useMutation(SignIn, {
    onSuccess: (data) => {
      dispatch({ type: 'login', payload: data.user });
      localStorage.setItem('access-token', data.access);
      localStorage.setItem('refresh-token', data.refresh);
      toast({
        title: 'Signed in.',
        description: 'You have successfully signed into KeyKorea.',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      w={{ base: 'sm', md: 'md' }}
      boxShadow={'lg'}
      p={8}>
      {isError && (
        <Alert marginBottom="6" status="error">
          <AlertIcon /> Something went wrong!
        </Alert>
      )}
      <Formik
        onSubmit={mutate}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SigninSchema}>
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
              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} id="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Flex>
                <Spacer />
                <NavLink href="/auth/forgot-password">
                  <Link color={'blue.400'}>Forgot Password?</Link>
                </NavLink>
              </Flex>
              <Button
                isLoading={isLoading}
                type="submit"
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
