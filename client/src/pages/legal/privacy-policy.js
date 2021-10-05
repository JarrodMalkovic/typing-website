import * as React from 'react';

import { Container } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { useTitle } from 'react-use';

const PrivacyPolicy = ({ source }) => {
  useTitle('KeyKorea - Privacy Policy');

  return (
    <Container pt="8" maxW="container.xl">
      <ReactMarkdown components={ChakraUIRenderer()}>{source}</ReactMarkdown>
    </Container>
  );
};

PrivacyPolicy.propTypes = {
  source: PropTypes.string,
};

export const getStaticProps = async () => {
  const source = await import('../../modules/legal/content/privacy-policy.md');
  return { props: { source: source.default } };
};

export default PrivacyPolicy;
