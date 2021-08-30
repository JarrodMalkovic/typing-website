import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  Container,
  Heading,
  VStack,
  Image,
  Box,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Grid, Row, Col } from 'react-bootstrap';

const Home = (props) => {
  return (
    <Box>
      <VStack spacing={5} width="100%">
        <Box position="relative">
          <Image
            minW="full"
            opacity="90%"
            src={useColorModeValue(
              '/images/HomeDay.png',
              '/images/HomeNight.png',
            )}
          />
          <Text
            position="absolute"
            fontSize="8vw"
            fontWeight="bold"
            fontFamily="Homepage"
            top="20%"
            left="5%"
            transform="translate(-50% -50%)"
            textColor="white">
            안녕하십니까
          </Text>
          <Text
            position="absolute"
            fontSize="6vw"
            fontWeight="bold"
            top="30%"
            left="5%"
            trasnform="translate(-50% -50%)"
            textColor="white">
            {props.username}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
