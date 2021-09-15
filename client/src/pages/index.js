import * as React from 'react';

import {
  VStack,
  Image,
  Box,
  useColorModeValue,
  Text,
  Button,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Home = (props) => {
  return (
    <Box>
      <VStack spacing={5} width="100%">
        <Box position="relative">
          <Image
            minW="full"
            opacity="90%"
            src={useColorModeValue(
              '/images/HomeDay.png',
              '/images/HomeNight.png',
            )}
          />
          <Text
            position="absolute"
            fontSize="8vw"
            fontWeight="bold"
            fontFamily="Homepage"
            top="20%"
            left="5%"
            transform="translate(-50% -50%)"
            textColor="white">
            안녕하십니까
          </Text>
          <Text
            position="absolute"
            fontSize="6vw"
            fontWeight="bold"
            top="30%"
            left="5%"
            trasnform="translate(-50% -50%)"
            textColor="white">
            {props.username}
          </Text>
          <Link href="/menu">
            <Button
              bgColor="blue.400"
              _hover={{
                bg: 'blue.500',
              }}
              color="white"
              rightIcon={<ArrowForwardIcon />}>
              Get Started!
            </Button>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
