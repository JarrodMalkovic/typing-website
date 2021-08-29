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
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

const ForgotPasswordSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
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
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ForgotPasswordSchema}>
        {() => (
          <Form>
            <Stack spacing={4}>
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
              <Field name="confirmPassword">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.confirmPassword &&
                      form.touched.confirmPassword
                    }>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input {...field} id="confirmPassword" type="password" />
                    <FormErrorMessage>
                      {form.errors.confirmPassword}
                    </FormErrorMessage>
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
                Reset Password
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ForgotPasswordForm;
