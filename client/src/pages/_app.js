import * as React from 'react';

import { Box, ChakraProvider, Flex } from '@chakra-ui/react';

import Footer from '../common/components/footer';
import Navbar from '../common/components/navbar';
import PropTypes from 'prop-types';
import theme from '../theme';
import AuthProvider from '../modules/auth/context/auth-context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import '../common/styles/index.css';

const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehyrdaedState}>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <Flex
              flexDirection="column"
              height="100vh"
              justifyContent="between">
              <Navbar />
              <Box marginBottom="auto">
                <Component {...pageProps} />
              </Box>
              <Footer />
            </Flex>
          </ChakraProvider>
        </AuthProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};

export default MyApp;
