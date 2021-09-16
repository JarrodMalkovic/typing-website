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

const DeleteAccountSettings = () => {
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
                Delete Account
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
            <Box px={{ base: 4, sm: 6 }} py={3} textAlign="right">
              <Button type="submit" variant="solid" fontWeight="md">
                Delete Account
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

export default DeleteAccountSettings;
