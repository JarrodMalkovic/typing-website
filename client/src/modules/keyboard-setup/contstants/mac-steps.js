import * as React from 'react';

import { Text, Image, Container, Wrap, Box } from '@chakra-ui/react';

const Step1 = (
  <Wrap justify="center" pt="8">
    <Box maxW="500px">
      <Image src="/images/Mac - Step 1.png" width="100%" borderRadius="2%" />
    </Box>
    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        Click on the Apple logo in the upper left corner of the screen and
        Select "System Preferences".
      </Text>
    </Container>
  </Wrap>
);

const Step2 = (
  <Wrap justify="center" pt="8">
    <Box maxW="500px">
      <Image src="/images/Mac - Step 2.png" width="100%" borderRadius="2%" />
    </Box>
    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        Under system preferences, first select "Keyboard", then under the "Input
        Sources" tab click on the "+" sign in the bottom left corner.
      </Text>
    </Container>
  </Wrap>
);

const Step3 = (
  <Wrap justify="center" pt="8">
    <Box maxW="500px">
      <Image src="/images/Mac - Step 3.png" width="100%" borderRadius="2%" />
    </Box>

    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        In the pop-up input method list, select “Korean” and then in the list of
        Korean input methods on the right, select the one you want to use, and
        then click "Add". We suggest you choose 2-Set Korean because it is the
        only national standard for Hangul keyboard.
      </Text>
    </Container>
  </Wrap>
);

const Step4 = (
  <Wrap justify="center" pt="8">
    <Box maxW="500px">
      <Image src="/images/Mac - Step 4.png" width="100%" borderRadius="2%" />{' '}
    </Box>
    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        Ensure that your the 2-Set Korean Keyboard is your default keyboard.
      </Text>
    </Container>
  </Wrap>
);

const macSteps = [
  { label: 'Step 1', description: 'Starting', content: Step1 },
  { label: 'Step 2', description: 'System Preferences', content: Step2 },
  { label: 'Step 3', description: 'Input Sources', content: Step3 },
  { label: 'Step 4', description: 'Set Korean Keyboard', content: Step4 },
];

export { macSteps };
