import * as React from 'react';

import { Heading, Wrap, Container, Image, Divider } from '@chakra-ui/react';

const Step1 = (
  <Wrap position="absolute" justify="center">
    <Image
      src="/images/ubunutu1.png"
      minW="40%"
      mawW="40%"
      height={300}
      border="1px"
    />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        Install the ibus-hangul plugin from the Ubuntu Software app, and restart
        your computer.
      </Heading>
    </Container>
  </Wrap>
);

const Step2 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/Linux 1.png" minW="40%" mawW="40%" height={300} />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        Open Settings, and navigate to the Language and Region tab.
      </Heading>
    </Container>
  </Wrap>
);

const Step3 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/Linux 2.png" minW="40%" mawW="40%" height={300} />
    <Image src="/images/ubuntu2.png" minW="40%" mawW="40%" height={300} />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        Click the plus button under the Input Sources heading, then the 3
        vertical dots at the button to open the expanded menu, then scroll to
        the bottom and find "Other". Once in other, search for "Korean" and
        select "Korean (Hangul)".
      </Heading>
    </Container>
  </Wrap>
);

const Step4 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/ubuntu3.png" minW="40%" mawW="40%" height={300} />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        At the top right of the screen, select the language drop down menu,
        select Korean (Hangul), and then click on it again and turn Hangul mode
        on.
      </Heading>
    </Container>
  </Wrap>
);

const linuxSteps = [
  { label: 'Step 1', description: 'Installing Hangul', content: Step1 },
  { label: 'Step 2', description: 'Navigating Settings', content: Step2 },
  { label: 'Step 3', description: 'Setting Language', content: Step3 },
  { label: 'Step 4', description: 'Selecting Hangul', content: Step4 },
];

export { linuxSteps };
