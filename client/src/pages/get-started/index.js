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
import ProgressiveImage from 'react-progressive-image';
import Link from 'next/link';
import { Tooltip } from '@chakra-ui/react';

const Menu = () => {
  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={5} width="100%">
        <VStack spacing="1">
          <Heading textAlign="center" fontSize="45px">
            Begin Your Journey
          </Heading>

          <Text
            textAlign="center"
            fontSize="20px"
            color={useColorModeValue('gray.600', 'gray.200')}>
            Choose Your Path!
          </Text>
        </VStack>
        <Wrap justify="center">
          <HStack>
            <Link href="/setup">
              <a>
                <Tooltip
                  label="Set your keyboard to Korean!"
                  placement="bottom">
                  <Box padding="20px" _hover={{ color: 'blue.400' }}>
                    <Box marginBottom="20px">
                      <Image
                        as={ProgressiveImage}
                        boxSize="250px"
                        margin="10px"
                        objectFit="cover"
                        placeholder="./images/menu_setup_small.webp"
                        src="./images/menu_setup.webp">
                        {(src, loading) => (
                          <Image
                            style={{ filter: loading ? 'blur(5px)' : '' }}
                            boxSize="250px"
                            margin="10px"
                            objectFit="cover"
                            src={src}
                          />
                        )}
                      </Image>
                    </Box>
                    <Text
                      mt="10px"
                      textAlign="center"
                      fontWeight="bold"
                      fontSize="xl">
                      Keyboard Setup
                    </Text>
                  </Box>
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
                  <Box padding="20px" _hover={{ color: 'blue.400' }}>
                    <Box marginBottom="20px">
                      <Image
                        as={ProgressiveImage}
                        boxSize="250px"
                        margin="10px"
                        objectFit="cover"
                        placeholder="./images/menu_practice_small.webp"
                        src="./images/menu_practice.webp">
                        {(src, loading) => (
                          <Image
                            style={{ filter: loading ? 'blur(5px)' : '' }}
                            boxSize="250px"
                            margin="10px"
                            objectFit="cover"
                            src={src}
                          />
                        )}
                      </Image>
                    </Box>
                    <Text
                      mt="10px"
                      textAlign="center"
                      fontWeight="bold"
                      fontSize="xl">
                      Practice
                    </Text>
                  </Box>
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
                  <Box padding="20px" _hover={{ color: 'blue.400' }}>
                    <Box marginBottom="20px">
                      <Image
                        as={ProgressiveImage}
                        boxSize="250px"
                        margin="10px"
                        objectFit="cover"
                        placeholder="./images/menu_challenge_small.webp"
                        src="./images/menu_challenge.webp">
                        {(src, loading) => (
                          <Image
                            style={{ filter: loading ? 'blur(5px)' : '' }}
                            boxSize="250px"
                            margin="10px"
                            objectFit="cover"
                            src={src}
                          />
                        )}
                      </Image>
                    </Box>
                    <Text
                      mt="10px"
                      textAlign="center"
                      fontWeight="bold"
                      fontSize="xl">
                      Challenge
                    </Text>
                  </Box>
                </Tooltip>
              </a>
            </Link>
          </HStack>
        </Wrap>
      </VStack>
    </Container>
  );
};

export default Menu;
