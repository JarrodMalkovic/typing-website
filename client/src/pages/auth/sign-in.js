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
import SigninForm from '../../modules/auth/components/sign-in-form.js';
import { useAuthorizedRedirect } from '../../modules/auth/hooks/use-authorized-redirect.js';
import { useTitle } from 'react-use';

const SignIn = () => {
  useTitle('KeyKorea - Sign in');
  useAuthorizedRedirect();

  return (
    <Box position="relative">
      <VStack spacing={5} width="100%">
        <Flex align={'center'} justify={'center'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in </Heading>
              <Text
                fontSize={'lg'}
                color={useColorModeValue('gray.600', 'gray.200')}>
                Dont have an account?{' '}
                <NavLink href="/auth/sign-up">
                  <Link color={'blue.400'}>Sign up</Link>
                </NavLink>
              </Text>
            </Stack>
            <SigninForm />
          </Stack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SignIn;
