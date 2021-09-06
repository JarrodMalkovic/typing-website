import * as React from 'react';


import { useColorModeValue, useTheme, Image,Text, HStack } from '@chakra-ui/react';
import Link from 'next/link';

// Current SVG is just a placeholder for now
const Logo = () => {
  const theme = useTheme();

  return (
    <Link href='/'>
      <a>
        <HStack>
          <Image src="/images/logo.png"  boxSize="50px"/>
          <Text fontWeight =  "bold" fontSize = "2xl"> 
            Key Korea
          </Text>
        </HStack>
      </a>
    </Link>
  );
};

export default Logo;
