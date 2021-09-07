import * as React from 'react';

import {
  Center,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Box,
  VStack,
} from '@chakra-ui/react';

import ForgotPasswordForm from '../../modules/auth/components/forgot-password-form.js';

const ForgotPassword = () => {
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
              <Heading fontSize={'4xl'}>Forgot Password </Heading>

              <Text
                textAlign="center"
                fontSize={'lg'}
                color={useColorModeValue('gray.600', 'gray.200')}>
                If there is an account associated with the provided email
                address, you will receive an email that contains a link to reset
                your password.
              </Text>
            </Stack>
            <ForgotPasswordForm />
          </Stack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ForgotPassword;
