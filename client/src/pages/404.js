import * as React from 'react';

import { Container, Heading, VStack } from '@chakra-ui/react';

const PageNotFound = () => {
  return (
    <Container pt='8' maxW='container.xl'>
      <VStack spacing={5} width='100%' align='stretch'>
        <Heading>Page not Found</Heading>
      </VStack>
    </Container>
  );
};

export default PageNotFound;
