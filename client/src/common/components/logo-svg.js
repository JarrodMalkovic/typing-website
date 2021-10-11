import * as React from 'react';

import { Image, Text, HStack } from '@chakra-ui/react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <HStack spacing="4">
          <Image
            display={{ base: 'none', md: 'flex' }}
            src="/images/logo.webp"
            boxSize="40px"
          />
          <Text fontWeight="bold" fontSize="2xl">
            KeyKorea
          </Text>
        </HStack>
      </a>
    </Link>
  );
};

export default Logo;
