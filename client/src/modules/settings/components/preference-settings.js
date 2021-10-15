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
  useColorModeValue,
  RadioGroup,
  Radio,
  useColorMode,
} from '@chakra-ui/react';

const PreferenceSettings = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box>
        <SimpleGrid
          display={{ base: 'initial', md: 'grid' }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}>
          <GridItem colSpan={{ md: 1 }}>
            <Box>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Website Preferences
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.400')}>
                Change how the site looks for you
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <Stack pl={[0, 0, 6]} py={5} spacing={6}>
              <Box>
                <FormControl as={GridItem}>
                  <FormLabel>Theme</FormLabel>
                  <RadioGroup>
                    <Stack>
                      <Box
                        onClick={() =>
                          colorMode === 'light' && toggleColorMode()
                        }>
                        <Radio isChecked={colorMode === 'dark'}>
                          Dark Mode
                        </Radio>
                      </Box>
                      <Box
                        onClick={() =>
                          colorMode === 'dark' && toggleColorMode()
                        }>
                        <Radio isChecked={colorMode === 'light'}>
                          Light Mode
                        </Radio>
                      </Box>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
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

export default PreferenceSettings;
