import React from 'react';
import {
  Container,
  Heading,
  HStack,
  VStack,
  Divider,
  Image,
  Wrap,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

import Link from 'next/link';
import { Tooltip } from '@chakra-ui/react';

const Menu = () => {
  return (
    <Box position="relative" mt={10}>
      <VStack padding="20px" width="100%">
        <Heading fontSize="45px" padding="20px">
          Begin Your Journey!
        </Heading>

        <Text fontSize="20px" color={useColorModeValue('gray.600', 'gray.200')}>
          Choose Your Path!
        </Text>

        <Wrap justify="center">
          <HStack>
            <Link href="/setup">
              <a>
                <Tooltip
                  label="Set your keyboard to Korean!"
                  placement="bottom">
                  <Container
                    padding="20px"
                    maxW="container.lg"
                    _hover={{ color: '#39aae1' }}>
                    <Box
                      border="4px"
                      borderRadius="5%"
                      borderColor="gray"
                      _hover={{ borderColor: '#39aae1' }}>
                      <Image
                        src="/images/menu_setup.png"
                        boxSize="250px"
                        margin="10px"
                      />
                    </Box>
                    <Text
                      mt="10px"
                      textAlign="center"
                      fontWeight="bold"
                      fontSize="xl">
                      Keyboard Setup
                    </Text>
                  </Container>
                </Tooltip>
              </a>
            </Link>
          </HStack>

          <HStack>
            <Link href="/practice">
              <a>
                <Tooltip
                  label="Begin practicing your keyboard typing skills!"
                  placement="bottom">
                  <Container
                    padding="20px"
                    maxW="container.lg"
                    _hover={{ color: '#39aae1' }}>
                    <Box
                      border="4px"
                      borderRadius="5%"
                      borderColor="gray"
                      _hover={{ borderColor: '#39aae1' }}>
                      <Image
                        src="/images/menu_practice.png"
                        boxSize="250px"
                        margin="10px"
                      />
                    </Box>
                    <Text
                      mt="10px"
                      textAlign="center"
                      fontWeight="bold"
                      fontSize="xl">
                      Practice
                    </Text>
                  </Container>
                </Tooltip>
              </a>
            </Link>
          </HStack>

          <HStack>
            <Link href="/challenge">
              <a>
                <Tooltip
                  label="Put your typing skills to the ultimate test!"
                  placement="bottom">
                  <Container
                    padding="20px"
                    maxW="container.lg"
                    _hover={{ color: '#39aae1' }}>
                    <Box
                      border="4px"
                      borderRadius="5%"
                      borderColor="gray"
                      _hover={{ borderColor: '#39aae1' }}>
                      <Image
                        src="/images/menu_challenge.png"
                        boxSize="250px"
                        margin="10px"
                      />
                    </Box>
                    <Text
                      mt="10px"
                      textAlign="center"
                      fontWeight="bold"
                      fontSize="xl">
                      Challenge
                    </Text>
                  </Container>
                </Tooltip>
              </a>
            </Link>
          </HStack>
        </Wrap>
      </VStack>
    </Box>
  );
};

export default Menu;
