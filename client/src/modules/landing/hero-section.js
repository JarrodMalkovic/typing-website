import * as React from 'react';

import {
  Image,
  Box,
  useColorModeValue,
  Text,
  Button,
  Heading,
  Container,
  SimpleGrid,
  Stack,
  Link,
  Flex,
  chakra,
  ButtonGroup,
  HStack,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ProgressiveImage from 'react-progressive-image';
import { useAuth } from '../auth/hooks/use-auth';

// Design inspired from: https://pro.chakra-ui.com/components/marketing/heroes/with-slight-cut-image
const HeroSection = ({ learnMoreRef }) => {
  const { state } = useAuth();

  return (
    <Box
      px={4}
      position="relative"
      paddingBottom={{ base: '20', lg: '40' }}
      paddingTop={{ base: '20', lg: '40' }}
      backgroundColor={useColorModeValue('gray.100', '#1c232e')}>
      <Container maxW="container.xl">
        <Box
          textAlign={{ base: 'center', lg: 'left' }}
          maxW={{ base: '100%', lg: '50%' }}>
          <Heading size="2xl">
            Learn how to use the <Box as="span">Korean Keyboard</Box>
          </Heading>
          <Text
            pt="4"
            fontSize="xl"
            color={useColorModeValue('gray.600', 'gray.300')}>
            Improve your typing skills in Korean with our easy-to-follow yet
            interactive and helpful modules!
          </Text>
          <ButtonGroup pt="4">
            <NextLink
              href={
                state && state.isAuthenticated
                  ? '/get-started'
                  : '/auth/sign-in'
              }>
              <a>
                <Button
                  color="white"
                  backgroundColor="blue.400"
                  variant="solid"
                  _hover={{
                    backgroundColor: 'blue.500',
                  }}>
                  Get Started
                </Button>
              </a>
            </NextLink>
            <Button
              onClick={() =>
                window.scrollTo({
                  behavior: 'smooth',
                  top: learnMoreRef.current.offsetTop,
                })
              }>
              Learn More
            </Button>
          </ButtonGroup>
        </Box>
      </Container>
      <Box
        visibility={{ base: 'hidden', lg: 'visible' }}
        width="50%"
        position="absolute"
        height="full"
        right="0px"
        bottom="0px"
        top="0px"
        clipPath="polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)">
        <Image
          as={ProgressiveImage}
          height="100%"
          width="100%"
          objectFit="cover"
          placeholder={useColorModeValue(
            './images/korea-day-small.webp',
            './images/korea-night-small.webp',
          )}
          src={useColorModeValue(
            './images/korea-day.webp',
            './images/korea-night.webp',
          )}>
          {(src, loading) => (
            <Image
              style={{ filter: loading ? 'blur(5px)' : '' }}
              height="100%"
              width="100%"
              objectFit="cover"
              src={src}
            />
          )}
        </Image>
      </Box>
    </Box>
  );
};

export default HeroSection;
