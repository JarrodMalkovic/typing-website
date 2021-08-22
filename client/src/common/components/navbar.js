import * as React from 'react';

import {
  Box,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

import ActiveNavLink from './active-nav-link';
import DarkModeToggle from './dark-mode-toggle-button';
import Logo from './logo-svg';

const Links = [
  { name: 'Menu', href: '/menu'},
  { name: 'Practice', href: '/practice' },
  { name: 'Challenge', href: '/challenge' },
  { name: 'Keyboard Setup', href: '/setup' },
];

// Adapted from: https://chakra-templates.dev/navigation/navbar
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      borderBottom={'2px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      bg={useColorModeValue('white', 'gray.900')}
      px={4}>
      <Container maxW='container.xl'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Logo />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map(link => (
                <ActiveNavLink
                  name={link.name}
                  href={link.href}
                  key={link.name}
                />
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <HStack as={'nav'} spacing={4}>
              <DarkModeToggle />
              <ActiveNavLink name={'Sign In'} href={'/auth/sign-in'} />
              <Box display={{ base: 'none', md: 'flex' }}>
                <ActiveNavLink name={'Sign Up'} href={'/auth/sign-up'} />
              </Box>
            </HStack>
          </Flex>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <ActiveNavLink
                  name={link.name}
                  href={link.href}
                  key={link.name}
                />
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Navbar;
