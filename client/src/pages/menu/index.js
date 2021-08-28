import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const Menu = () => {
  return (
    <>
      <Flex height="100vh" alignitems="center" justifyContent="center">
        <Flex direction="column" background="lightblue" p={70} rounded={90}>
          <Heading mb={6}> Begin Your Journey </Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default Menu;
