import * as React from 'react';

import {
  Menu,
  MenuButton,
  HStack,
  Avatar,
  VStack,
  Text,
  Box,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
} from '@chakra-ui/react';

import { FiChevronDown } from 'react-icons/fi';

import Link from 'next/link';
import { useAuth } from '../../modules/auth/hooks/use-auth';

// Adapated from: https://chakra-templates.dev/navigation/sidebar
const UserProfileDropdown = () => {
  const { state, dispatch } = useAuth();

  const logout = () => {
    dispatch({ type: 'logout' });
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('access-token');
  };

  return (
    <>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
          <HStack>
            <Avatar size={'sm'} src={state.user.avatar} />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text>{state.user.username}</Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue('white', 'gray.900')}
          borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <Link href="/profile/username">
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link href="/past-attempts">
            <MenuItem>Past Attempts</MenuItem>
          </Link>
          <Link href="/leaderboard">
            <MenuItem>Leaderboard</MenuItem>
          </Link>
          <Link href="/settings">
            <MenuItem>Settings</MenuItem>
          </Link>
          <MenuDivider />
          <Link href="/dashboard">
            <MenuItem>Exercise Dashboard</MenuItem>
          </Link>
          <Link href="/statistics">
            <MenuItem>Exercise Statistics</MenuItem>
          </Link>
          <Link href="/users">
            <MenuItem>User Management</MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem onClick={logout}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserProfileDropdown;
