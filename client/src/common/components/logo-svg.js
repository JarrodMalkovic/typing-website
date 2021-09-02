import * as React from 'react';

<<<<<<< Updated upstream
import { useColorModeValue, useTheme, Image,Text, HStack } from '@chakra-ui/react';
=======
import { useColorModeValue, useTheme, Container, Image} from '@chakra-ui/react';
>>>>>>> Stashed changes

import Link from 'next/link';

// Current SVG is just a placeholder for now
const Logo = () => {
  const theme = useTheme();

  return (
    <Link href='/'>
      <a>
<<<<<<< Updated upstream
        <HStack>
          <Image src="/images/logo.png"  boxSize="50px"/>
          <Text fontWeight =  "bold" fontSize = "2xl"> 
            Key Korea
          </Text>
        </HStack>
=======
        <Container padding = "20px">
          <Image src="/images/logo.png"  boxSize="50px"/>
        </Container>
>>>>>>> Stashed changes
      </a>
    </Link>
  );
};

export default Logo;
