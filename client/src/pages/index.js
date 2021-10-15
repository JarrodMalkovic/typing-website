import * as React from 'react';

import {
  Image,
  Box,
  useColorModeValue,
  Text,
  Button,
  Heading,
  Container,
  SimpleGrid,
  Stack,
  Link,
  Flex,
  chakra,
  ButtonGroup,
  HStack,
  Divider,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '../modules/auth/hooks/use-auth';
import { useTitle } from 'react-use';
import ProgressiveImage from 'react-progressive-image';
import HeroSection from '../modules/landing/hero-section';
import FeatureSection from '../modules/landing/feature-section';

const Home = () => {
  useTitle('KeyKorea');

  const { state } = useAuth();
  const learnMoreRef = React.useRef();

  return (
    <>
      <HeroSection learnMoreRef={learnMoreRef} />
      <FeatureSection learnMoreRef={learnMoreRef} />
    </>
  );
};

export default Home;
