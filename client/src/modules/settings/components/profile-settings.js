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

const ProfileSettings = () => {
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
                Profile
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
                  <FormLabel>Username</FormLabel>
                  <Input type="tel" width="100%" rounded="md" />
                </FormControl>
              </Box>

              <Box>
                <FormControl id="email" mt={1}>
                  <FormLabel>About</FormLabel>
                  <Textarea
                    mt={1}
                    rows={5}
                    shadow="sm"
                    fontSize={{ sm: 'sm' }}
                  />
                  <FormHelperText>
                    Brief description for your profile
                  </FormHelperText>
                </FormControl>
              </Box>

              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="md"
                  color={useColorModeValue('gray.700', 'gray.50')}>
                  Photo
                </FormLabel>
                <Flex alignItems="center" mt={1}>
                  <Avatar
                    boxSize={12}
                    bg={useColorModeValue('gray.100', 'gray.800')}
                    icon={
                      <Icon
                        boxSize={9}
                        mt={3}
                        rounded="full"
                        color={useColorModeValue('gray.300', 'gray.700')}
                      />
                    }
                  />
                  <ButtonGroup>
                    <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: 'none' }}>
                      Change
                    </Button>
                  </ButtonGroup>
                </Flex>
              </FormControl>
            </Stack>
            <Box px={{ base: 4, sm: 6 }} py={3} textAlign="right">
              <Button type="submit" variant="solid" fontWeight="md">
                Save Profile Changes
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

export default ProfileSettings;
