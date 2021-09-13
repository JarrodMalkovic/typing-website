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
  WrapItem,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';

import Link from 'next/link';
import { Tooltip } from "@chakra-ui/react";



const Menu = () => {
  

  return (

    <Box position="relative"  mt = {10}>
      
      <VStack padding = "20px" width="100%">

        <Heading fontSize="45px" padding="20px">
        Begin Your Journey!
        </Heading>

        <Text
            fontSize="20px"
            color={useColorModeValue('gray.600', 'gray.200')}>
            Choose Your Path!
        </Text>

<<<<<<< Updated upstream
          <WrapItem>
            <HStack>
              <Tooltip label = "Set your keyboard to Korean!" placement = "bottom">
                <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
                  <Link href="/setup">
                    <a>
                      <Image src = "/images/setup.png" boxSize="200px" margin = "10px"/>
                      <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Setup</Text>
                    </a>
                  </Link>
                </Container>
              </Tooltip>

              <Tooltip label = "Begin practicing your keyboard typing skills!" placement = "bottom">
                <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
                  <Link href="/practice">
                    <a>
                      <Image src = "/images/practice.png" boxSize="200px" margin = "10px"/>
                      <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Practice</Text>
                    </a>
                  </Link>
                </Container>
              </Tooltip>

              <Tooltip label = "Put your typing skills to the ultimate test!" placement = "bottom">
                <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
                  <Link href="/challenge">
                    <a>
                      <Image src = "/images/challenge.png" boxSize="200px" margin = "10px"/>
                      <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Challenge</Text>
                    </a>
                  </Link>
                </Container>
              </Tooltip>
=======
        <WrapItem>
          <HStack>
            <Tooltip label = "Set your keyboard to Korean!" placement = "bottom">
              <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
                <Link href="/setup">
                  <a>
                    <Image src = "/images/setup.png" boxSize="170px" margin = "10px"/>
                    <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Setup</Text>
                  </a>
                </Link>
              </Container>
            </Tooltip>

            <Tooltip label = "Begin practicing your keyboard typing skills!" placement = "bottom">
              <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
                <Link href="/practice">
                  <a>
                    <Image src = "/images/practice.png" boxSize="170px" margin = "10px"/>
                    <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Practice</Text>
                  </a>
                </Link>
              </Container>
            </Tooltip>

            <Tooltip label = "Put your typing skills to the ultimate test!" placement = "bottom">
              <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
                <Link href="/challenge">
                  <a>
                    <Image src = "/images/challenge.png" boxSize="170px" margin = "10px"/>
                    <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Challenge</Text>
                  </a>
                </Link>
              </Container>
            </Tooltip>
>>>>>>> Stashed changes

            </HStack>
          </WrapItem>
      </VStack>
    </Box>
  );
};

export default Menu;
