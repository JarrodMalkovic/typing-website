import * as React from 'react';

import {
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import ForgotPasswordForm from '../../modules/auth/components/forgot-password-form.js';

const ForgotPassword = () => {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Forgot Password </Heading>

          <Text
            textAlign="center"
            fontSize={'lg'}
            color={useColorModeValue('gray.600', 'gray.200')}>
            If there is an account associated with the provided email address,
            you will receive an email that contains a link to reset your
            password.
          </Text>
        </Stack>
        <ForgotPasswordForm />
      </Stack>
    </Flex>
  );
};

export default ForgotPassword;
