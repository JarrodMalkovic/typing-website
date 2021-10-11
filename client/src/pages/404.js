import * as React from 'react';

import {
  Container,
  Heading,
  Box,
  Text,
  VStack,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import Error404 from '../common/undraw/undraw-404';
import Link from 'next/link';

const PageNotFound = () => {
  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={5} width="100%" align="stretch" textAlign="center">
        <Box ml="auto" mr="auto">
          <Error404 />
        </Box>
        <Heading>Ooops. Something went wrong</Heading>
        <Text>Sorry, but we were unable to find this page</Text>
        <Box>
          <ButtonGroup ml="auto" mr="auto">
            <Link href="/">
              <a>
                <Button
                  color="white"
                  backgroundColor="blue.400"
                  _hover={{ backgroundColor: 'blue.500' }}>
                  Back to homepage
                </Button>
              </a>
            </Link>
            <Button onClick={() => location.reload()}>Try Again</Button>
          </ButtonGroup>
        </Box>
      </VStack>
    </Container>
  );
};

export default PageNotFound;
