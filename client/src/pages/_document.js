import * as React from 'react';

import { Box, ColorModeScript, useColorModeValue } from '@chakra-ui/react';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

import theme from '../theme';

// This component has to be a class component to work correctly with Next.js: https://github.com/vercel/next.js/issues/19355
class Document extends NextDocument {
  render () {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
