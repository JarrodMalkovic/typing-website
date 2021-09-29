import * as React from 'react';

import {
  Box,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormLabel,
  FormControl,
  Button,
  useColorModeValue,
  Input,
  Textarea,
  FormHelperText,
  ButtonGroup,
  Flex,
  Avatar,
  Icon,
} from '@chakra-ui/react';

const ChangePasswordSettings = () => {
  return (
    <>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}>
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Change Password
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}>
                This information will be displayed publicly so be careful what
                you share.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <Stack px={4} py={5} spacing={6} p={{ sm: 6 }}>
              <Box>
                <FormControl as={GridItem}>
                  <FormLabel>New Password</FormLabel>
                  <Input type="tel" width="100%" rounded="md" />
                </FormControl>
              </Box>

              <Box>
                <FormControl as={GridItem}>
                  <FormLabel>New Password Confirm</FormLabel>
                  <Input type="tel" width="100%" rounded="md" />
                </FormControl>
              </Box>
            </Stack>
            <Box px={{ base: 4, sm: 6 }} py={3} textAlign="right">
              <Button type="submit" variant="solid" fontWeight="md">
                Update Password
              </Button>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: 'hidden', sm: 'visible' }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue(
              'gray.200',
              'whiteAlpha.200',
            )}></Box>
        </Box>
      </Box>
    </>
  );
};

export default ChangePasswordSettings;