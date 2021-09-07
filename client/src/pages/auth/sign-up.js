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

const SignUp = () => {
  useAuthorizedRedirect();

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
