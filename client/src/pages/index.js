import * as React from 'react';

import {
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const Home = () => {
  return (
    <Container pt="8" maxW="container.md">
      <Flex align="center" alignItems="center">
        <VStack spacing={3} width="100%" align={'center'}>
          <Heading>Welcome to KeyKorea!</Heading>
          <Text
            color={useColorModeValue('gray.600', 'gray.200')}
            align="center"
            fontSize="3xl">
            This is a long subheading for the site that explains the site. It
            keeps on going
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
        </VStack>
        {/* </SimpleGrid> */}
      </Flex>
    </Container>
  );
};

export default Home;
