import * as React from 'react';

import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import ActiveNavLink from './active-nav-link';

// Adapted from: https://chakra-templates.dev/page-sections/footer
const Footer = () => {
  return (
    <Box
      pt={'20'}
      color={useColorModeValue('gray.700', 'gray.200')}
      margin={'0'}>
      <Container
        as={Stack}
        maxW={'container.xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text>© 2021 KeyKorea. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <ActiveNavLink
            name="Terms of Service"
            href="/legal/terms-of-service"
          />
          <ActiveNavLink name="Privacy Policy" href="/legal/privacy-policy" />
        </Stack>
      </Container>
    </Box>
  );
};
export default Footer;
