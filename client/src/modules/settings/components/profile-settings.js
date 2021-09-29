import * as React from 'react';

import {
  Box,
  SimpleGrid,
  GridItem,
  Heading,
  FormErrorMessage,
  Text,
  Stack,
  FormLabel,
  Link,
  FormControl,
  Button,
  useColorModeValue,
  Input,
  Textarea,
  FormHelperText,
  ButtonGroup,
  Skeleton,
  Flex,
  Avatar,
  Icon,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { BASE_API_URL } from '../../../common/contstants/base-api-url';
import { useAuth } from '../../auth/hooks/use-auth';

const getProfileSettings = async () => {
  const { data } = await axios.get(`${BASE_API_URL}/api/user/profile/`);
  return data;
};

const updateProfileSettings = async (body) => {
  const { data } = await axios.patch(`${BASE_API_URL}/api/user/profile/`, body);
  return data;
};

const ProfileSettings = () => {
  const { dispatch } = useAuth();
  const { data, isLoading } = useQuery('profile-setttings', getProfileSettings);
  const mutation = useMutation(updateProfileSettings, {
    onSuccess: (data) => {
      console.log(data);
      dispatch({ type: 'update', payload: data.username });
    },
  });

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
                Profile
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
              enableReinitialize={true}
              initialValues={{
                username: (data && data.username) || '',
                bio: (data && data.bio) || '',
              }}
              onSubmit={mutation.mutate}>
              {() => (
                <Form>
                  <Stack px={4} py={5} spacing={6} p={{ sm: 6 }}>
                    <Field name="username">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.username && form.touched.username
                          }>
                          <Skeleton width="100px" isLoaded={!isLoading}>
                            <FormLabel>Username</FormLabel>
                          </Skeleton>
                          <Skeleton isLoaded={!isLoading}>
                            <Input {...field} id="username" />
                          </Skeleton>
                          <FormErrorMessage>
                            {form.errors.username}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="bio">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.bio && form.touched.bio}>
                          <Skeleton width="100px" isLoaded={!isLoading}>
                            <FormLabel>About</FormLabel>
                          </Skeleton>
                          <Skeleton isLoaded={!isLoading}>
                            <Textarea
                              rows={5}
                              shadow="sm"
                              {...field}
                              id="bio"
                            />
                          </Skeleton>
                          <Skeleton w="200px" isLoaded={!isLoading}>
                            <FormHelperText>
                              Brief description for your profile
                            </FormHelperText>
                          </Skeleton>
                        </FormControl>
                      )}
                    </Field>

                    <FormControl>
                      <Skeleton width="100px" isLoaded={!isLoading}>
                        <FormLabel
                          fontSize="sm"
                          fontWeight="md"
                          color={useColorModeValue('gray.700', 'gray.50')}>
                          Photo
                        </FormLabel>
                      </Skeleton>
                      <Skeleton w="200px" isLoaded={!isLoading}>
                        <Flex alignItems="center" mt={1}>
                          <Avatar
                            src={data && data.avatar}
                            boxSize={12}
                            bg={useColorModeValue('gray.100', 'gray.800')}
                            icon={
                              <Icon
                                boxSize={9}
                                mt={3}
                                rounded="full"
                                color={useColorModeValue(
                                  'gray.300',
                                  'gray.700',
                                )}
                              />
                            }
                          />
                          <ButtonGroup>
                            <Button
                              as={Link}
                              target="_blank"
                              href="https://en.gravatar.com/support/faq/"
                              type="button"
                              ml={5}
                              variant="outline"
                              size="sm"
                              fontWeight="medium"
                              _focus={{ shadow: 'none', underline: 'none' }}>
                              Change
                            </Button>
                          </ButtonGroup>
                        </Flex>{' '}
                      </Skeleton>
                    </FormControl>
                  </Stack>
                  <Box px={{ base: 4, sm: 6 }} py={3} textAlign="right">
                    <Button
                      isLoading={mutation.isLoading}
                      type="submit"
                      variant="solid"
                      fontWeight="md">
                      {mutation.isLoading
                        ? 'Saving...'
                        : 'Save Profile Changes'}
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

export default ProfileSettings;
