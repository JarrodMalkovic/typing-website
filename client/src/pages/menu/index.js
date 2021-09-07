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
  Center,
  Box,
} from '@chakra-ui/react';

import Link from 'next/link';

const Menu = () => {
  return (
    <Box position="relative">
      <VStack spacing={5} width="100%">
        <Image
          minW="full"
          opacity="70%"
          linear-gradient="(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25))"
          src="/images/Basic.png"
        />
        <Heading fontSize="45px" padding="20px" position="absolute">
          Begin Your Journey!
        </Heading>
        <Divider />

        <Wrap
          spacing="30px"
          justify="center"
          mt="50px"
          position="absolute"
          top={40}>
          <HStack>
            <Link href="/setup">
              <a>
                <Container padding="20px">
                  <Image src="/images/alphabet-course.png" boxSize="150px" />
                  <Text
                    textAlign="center"
                    mt="10px"
                    fontWeight="bold"
                    fontSize="2xl">
                    Keyboard Setup
                  </Text>
                </Container>
              </a>
            </Link>
          </HStack>

          <HStack>
            <Link href="/practice">
              <a>
                <Container padding="10px" justify="center">
                  <Image src="/images/greetings-course.png" boxSize="150px" />
                  <Text
                    textAlign="center"
                    mt="10px"
                    fontWeight="bold"
                    fontSize="2xl">
                    Practice
                  </Text>
                </Container>
              </a>
            </Link>
          </HStack>

          <HStack>
            <Link href="/challenge">
              <a>
                <Container padding="10px" justify="center">
                  <Image src="/images/why.png" boxSize="150px" />
                  <Text
                    textAlign="center"
                    mt="10px"
                    fontWeight="bold"
                    fontSize="2xl">
                    Challenge
                  </Text>
                </Container>
              </a>
            </Link>
          </HStack>
        </Wrap>
      </VStack>
    </Box>
  );
};

export default Menu;
