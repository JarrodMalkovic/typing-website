import * as React from 'react';

import { Container, Heading, VStack, Box, Image } from '@chakra-ui/react';

const ContactUs = () => {
  return (
    <Box position="relative">
      <VStack spacing={5} width="100%">
        <Image
          minW="full"
          opacity="30%"
          linear-gradient="(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25))"
          src="/images/Basic.png"
        />
        <Heading position="absolute">Contact Us</Heading>
      </VStack>
    </Box>
  );
};

export default ContactUs;
