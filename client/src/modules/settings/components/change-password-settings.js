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
  Input,
  Textarea,
  FormHelperText,
  FormErrorMessage,
  ButtonGroup,
  Flex,
  Avatar,
  Icon,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const ChangePasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

const changePassword = async (body) => {
  const { data } = await axios.patch(
    `${BASE_API_URL}/api/auth/change-password/`,
    { password: body.password },
  );

  return data;
};

const ChangePasswordSettings = () => {
  const mutation = useMutation(changePassword);

  return (
    <>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}>
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
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
              onSubmit={mutation.mutate}>
              {() => (
                <Form>
                  <Stack px={4} py={5} spacing={6} p={{ sm: 6 }}>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          as={GridItem}>
                          <FormLabel>New Password</FormLabel>
                          <Input
                            {...field}
                            type="tel"
                            width="100%"
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
                          />
                          <FormErrorMessage>
                            {form.errors.confirmPassword}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Box px={{ base: 4, sm: 6 }} py={3} textAlign="right">
                    <Button
                      type="submit"
                      isLoading={mutation.isLoading}
                      variant="solid"
                      fontWeight="md">
                      {mutation.isLoading ? 'Updating...' : 'Update Password'}
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
