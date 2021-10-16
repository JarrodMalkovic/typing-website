import * as React from 'react';

import {
  Wrap,
  Container,
  Image,
  Divider,
  Heading,
  Center,
  Text,
  VStack,
  HStack,
  Box,
} from '@chakra-ui/react';

const Step1 = (
  <Wrap justify="center" pt="8">
    <VStack>
      <Image
        src="/images/Windows_1.png"
        width="auto"
        maxH="400px"
        borderRadius="2%"
      />
      <Container minW="60vw">
        <Text size="md" pt="8" textAlign="center">
          Click the "Start" button and select "Settings"
        </Text>
      </Container>
    </VStack>
  </Wrap>
);

const Step2 = (
  <Wrap justify="center" pt="8">
    <VStack>
      <Image
        src="/images/Windows_2.png"
        width="auto"
        maxH="400px"
        borderRadius="2%"
      />
      <Container minW="60vw">
        <Text size="md" pt="8" textAlign="center">
          Select "Time & Language"
        </Text>
      </Container>
    </VStack>
  </Wrap>
);

const Step3 = (
  <Wrap justify="center" pt="8">
    <Box>
      <Image
        src="/images/Windows_3.png"
        width="auto"
        maxH="500px"
        borderRadius="2%"
      />
    </Box>
    <Box>
      <Image
        src="/images/Windows_4.png"
        width="auto"
        maxH="500px"
        borderRadius="2%"
      />
    </Box>

    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        Select "Language" and click on the following.
      </Text>
    </Container>
  </Wrap>
);

const Step4 = (
  <Wrap justify="center" pt="8">
    <Box>
      <Image
        src="/images/Windows_5.png"
        width="auto"
        maxH="400px"
        borderRadius="2%"
      />
    </Box>
    <Box>
      <Image
        src="/images/Windows_6.png"
        width="auto"
        maxH="400px"
        borderRadius="2%"
      />
    </Box>
    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        Select "Language" and click on the following.
      </Text>
    </Container>
  </Wrap>
);

const Step5 = (
  <Wrap justify="center" pt="8">
    <Box>
      <Image
        src="/images/Windows_7.png"
        width="auto"
        maxH="400px"
        borderRadius="2%"
      />
    </Box>
    <Box>
      <Image
        src="/images/Windows_8.png"
        width="auto"
        maxH="400px"
        borderRadius="2%"
      />
    </Box>
    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        Now the Korean Keyboard is available for use. Ensure that "2-Beolsik"
        keyboard type is selected. You Should be able to switch to Korean
        Keyboard as seen from the bottom righ corner of the screen.
      </Text>
    </Container>
  </Wrap>
);

const windowsSteps = [
  { label: 'Step 1', description: 'Starting', content: Step1 },
  { label: 'Step 2', description: 'Adding a Language', content: Step2 },
  { label: 'Step 3', description: 'Setting Korean Keyboard', content: Step3 },
  { label: 'Step 4', description: 'Installing Korean', content: Step4 },
  { label: 'Step 5', description: 'Switch to Korean', content: Step5 },
];

export { windowsSteps };
