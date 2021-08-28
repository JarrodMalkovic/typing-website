import * as React from 'react';

import { Box, ChakraProvider, Flex } from '@chakra-ui/react';

import Footer from '../common/components/footer';
import Navbar from '../common/components/navbar';
import PropTypes from 'prop-types';
import theme from '../theme';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection="column" height="100vh" justifyContent="between">
        <Navbar />
        <Box marginBottom="auto">
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Flex>
    </ChakraProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};

export default MyApp;
