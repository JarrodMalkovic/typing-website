import * as React from 'react';

import {
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Box,
  Image,
} from '@chakra-ui/react';

import NavLink from 'next/link';
import SignupForm from '../../modules/auth/components/sign-up-form';
import { useAuthorizedRedirect } from '../../modules/auth/hooks/use-authorized-redirect';
import { useTitle } from 'react-use';

const SignUp = () => {
  useTitle('KeyKorea - Sign up');
  useAuthorizedRedirect();

  return (
    <Box position="relative">
      <VStack spacing={5} width="100%">
        <Flex align={'center'} justify={'center'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign up</Heading>
              <Text
                fontSize={'lg'}
                color={useColorModeValue('gray.600', 'gray.200')}>
                Already have an account?{' '}
                <NavLink href="/auth/sign-in">
                  <Link color={'blue.400'}>Sign in</Link>
                </NavLink>
              </Text>
            </Stack>
            <SignupForm />
          </Stack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SignUp;
