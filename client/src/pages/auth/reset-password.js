import * as React from 'react';

import {
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import NavLink from 'next/link';
import ResetPasswordForm from '../../modules/auth/components/reset-password-form';

const ResetPassword = () => {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Reset Password </Heading>
        </Stack>
        <ResetPasswordForm />
      </Stack>
    </Flex>
  );
};

export default ResetPassword;
