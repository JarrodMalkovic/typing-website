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

// Adapated from: https://chakra-templates.dev/navigation/sidebar
const UserProfileDropdown = () => {
  return (
    <>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
          <HStack>
            <Avatar
              size={'sm'}
              src={
                'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
              }
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text fontSize="sm">Username Here</Text>
              <Text fontSize="xs" color="gray.600">
                Admin
              </Text>
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
          <Link href="/dashboard">
            <MenuItem>Admin Dashboard</MenuItem>
          </Link>
          <Link href="/past-attempts">
            <MenuItem>Past Attempts</MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserProfileDropdown;
