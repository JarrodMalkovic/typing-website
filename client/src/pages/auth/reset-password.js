import * as React from 'react';

import {
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Box,
  Image,
  VStack,
} from '@chakra-ui/react';

import NavLink from 'next/link';
import ResetPasswordForm from '../../modules/auth/components/reset-password-form';

const ResetPassword = () => {
  return (
    <Box position="relative">
      <VStack spacing={5} width="100%">
        <Image
          minW="full"
          opacity="30%"
          linear-gradient="(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25))"
          src="/images/Basic.png"
        />
        <Flex align={'center'} justify={'center'} position="absolute">
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Reset Password </Heading>
            </Stack>
            <ResetPasswordForm />
          </Stack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ResetPassword;
