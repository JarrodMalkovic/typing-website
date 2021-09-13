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


import Background from '../../../public/images/Basic.png';


const Menu = () => {
  

  return (

    <Box position="relative">
      
      <VStack padding = "20px" width="100%">

        <Heading fontSize="45px" padding="20px">
        Begin Your Journey!
        </Heading>

        <Text
            fontSize="20px"
            color={useColorModeValue('gray.600', 'gray.200')}>
            Choose Your Path!
        </Text>

        <WrapItem>
          <HStack>

            <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
              <Link href="/setup">
                <a>
                  <Image src = "/images/alphabet-course.png" boxSize="150px" margin = "10px"/>
                  <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Keyboard Setup</Text>
                </a>                        
              </Link>
            </Container>

            <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
              <Link href="/practice">
                <a>
                  <Image src = "/images/greetings-course.png" boxSize="150px" margin = "10px"/>
                  <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Practice</Text>
                </a>
              </Link>
            </Container>

            <Container padding = "20px" maxW="container.lg" _hover={{color: "#39aae1"}}>
              <Link href="/challenge">
                <a>
                  <Image src = "/images/why.png" boxSize="150px" margin = "10px"/>
                  <Text mt="10px" textAlign = "center" fontWeight =  "bold" fontSize = "xl">Challenge</Text>
                </a>
              </Link>
            </Container>

          </HStack>
        </WrapItem>
        </VStack>
        </Box>
  );
};

export default Menu;
