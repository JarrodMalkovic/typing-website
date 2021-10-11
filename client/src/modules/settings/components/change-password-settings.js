import * as React from 'react';

import {
  Box,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormLabel,
  FormControl,
  Button,
  useColorModeValue,
  useToast,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { displayErrors } from '../../../common/utils/display-errors';

const ChangePasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const changePassword = async (body) => {
  const { data } = await axios.patch(
    `${BASE_API_URL}/api/auth/change-password/`,
    { password: body.password },
  );

  return data;
};

const ChangePasswordSettings = () => {
  const toast = useToast();
  const { mutate, isLoading, isError, error } = useMutation(changePassword, {
    onSuccess: () =>
      toast({
        title: 'Updated password',
        description: 'You have successfully updated your password',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      }),
  });

  return (
    <>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}>
          <GridItem colSpan={{ md: 1 }}>
            <Box>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Change Password
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}>
                This information will be displayed publicly so be careful what
                you share.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              validationSchema={ChangePasswordSchema}
              onSubmit={mutate}>
              {() => (
                <Form>
                  <Stack pl={[0, 0, 6]} py={5} spacing={6}>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          as={GridItem}>
                          {isError && displayErrors(error)}
                          <FormLabel>New Password</FormLabel>
                          <Input
                            {...field}
                            type="tel"
                            width="100%"
                            type="password"
                            rounded="md"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="confirmPassword">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.confirmPassword &&
                            form.touched.confirmPassword
                          }
                          as={GridItem}>
                          <FormLabel>New Password Confirm</FormLabel>
                          <Input
                            {...field}
                            type="tel"
                            width="100%"
                            rounded="md"
                            type="password"
                          />
                          <FormErrorMessage>
                            {form.errors.confirmPassword}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Box py={3} textAlign="right">
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      variant="solid"
                      fontWeight="md">
                      {isLoading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue(
              'gray.200',
              'whiteAlpha.200',
            )}></Box>
        </Box>
      </Box>
    </>
  );
};

export default ChangePasswordSettings;
