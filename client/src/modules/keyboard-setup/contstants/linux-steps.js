import * as React from 'react';

import { Wrap, Text, Container, Image, VStack, Box } from '@chakra-ui/react';

const Step1 = (
  <Wrap justify="center" pt="8">
    <VStack>
      <Box maxW="500px">
        <Image
          src="/images/ubunutu1.png"
          width="100%"
          height="auto"
          borderRadius="2%"
        />
      </Box>
      <Text size="md" pt="8" textAlign="center">
        Install the ibus-hangul plugin from the Ubuntu Software app, and restart
        your computer.
      </Text>
    </VStack>
  </Wrap>
);

const Step2 = (
  <Wrap justify="center" pt="8">
    <Box maxW="500px">
      <Image
        src="/images/Linux 1.png"
        width="100%"
        height="auto"
        borderRadius="2%"
      />
    </Box>
    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        Open Settings, and navigate to the Language and Region tab.
      </Text>
    </Container>
  </Wrap>
);

const Step3 = (
  <Wrap justify="center" pt="8">
    <Box maxW="500px">
      <Image
        src="/images/Linux 2.png"
        width="100%"
        height="auto"
        borderRadius="2%"
      />
    </Box>
    <Box maxW="500px">
      <Image
        src="/images/ubuntu2.png"
        width="100%"
        height="auto"
        borderRadius="2%"
      />
    </Box>

    <Container minW="60vw">
      <Text size="md" pt="8" textAlign="center">
        Click the plus button under the Input Sources heading, then the 3
        vertical dots at the button to open the expanded menu, then scroll to
        the bottom and find "Other". Once in other, search for "Korean" and
        select "Korean (Hangul)".
      </Text>
    </Container>
  </Wrap>
);

const Step4 = (
  <Wrap justify="center" pt="8">
    <VStack>
      <Box maxW="500px">
        <Image
          src="/images/ubuntu3.png"
          width="100%"
          height="auto"
          borderRadius="2%"
        />
      </Box>
      <Container minW="60vw">
        <Text size="md" pt="8" textAlign="center">
          At the top right of the screen, select the language drop down menu,
          select Korean (Hangul), and then click on it again and turn Hangul
          mode on.
        </Text>
      </Container>
    </VStack>
  </Wrap>
);

const linuxSteps = [
  { label: 'Step 1', description: 'Installing Hangul', content: Step1 },
  { label: 'Step 2', description: 'Navigating Settings', content: Step2 },
  { label: 'Step 3', description: 'Setting Language', content: Step3 },
  { label: 'Step 4', description: 'Selecting Hangul', content: Step4 },
];

export { linuxSteps };
