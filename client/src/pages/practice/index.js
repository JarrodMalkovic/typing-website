import * as React from 'react';

import { Container, Flex, Heading, VStack } from '@chakra-ui/react';

import Link from 'next/link';

const Practice = () => {
  return (
    <Container pt='8' maxW='container.xl'>
      <VStack spacing={5} width='100%' align='stretch'>
        <Heading>Select an Exercise</Heading>
        <Link href='/practice/example-exercise'>Click here</Link>
      </VStack>
    </Container>
  );
};

export default Practice;
