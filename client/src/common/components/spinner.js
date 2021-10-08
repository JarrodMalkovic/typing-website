import {
  Box,
  Center,
  Container,
  Spinner as ChakraSpinner,
} from '@chakra-ui/react';

const Spinner = () => {
  return (
    <Box pt="8" w="full">
      <Center>
        <ChakraSpinner color="blue.400" />
      </Center>
    </Box>
  );
};

export default Spinner;
