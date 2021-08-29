import * as React from 'react';

import { Container, Heading, VStack } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Container pt="8" maxW="container.xl">
      <VStack spacing={5} width="100%" align="stretch">
        <Heading>Profile Page</Heading>
      </VStack>
    </Container>
  );
};

export default Profile;