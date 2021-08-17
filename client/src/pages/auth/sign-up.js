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
import SignupForm from '../../modules/auth/components/sign-up-form';

const SignUp = () => {
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up</Heading>
          <Text
            fontSize={'lg'}
            color={useColorModeValue('gray.600', 'gray.200')}>
            Already have an account?{' '}
            <NavLink href='/auth/sign-in'>
              <Link color={'blue.400'}>Sign in</Link>
            </NavLink>
          </Text>
        </Stack>
        <SignupForm />
      </Stack>
    </Flex>
  );
};

export default SignUp;
