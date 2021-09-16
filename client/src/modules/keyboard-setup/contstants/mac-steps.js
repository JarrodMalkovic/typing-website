import * as React from 'react';

import {
  Flex,
  Text,
  Image,
  Box,
  Divider,
  Container,
  Heading,
  Wrap,
} from '@chakra-ui/react';
//Need to have the image centered and have the have the step counter underneath it not have an absolute position on the page
//Someho need to have it react to how big the container in the content is??????
const Step1 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/mac 1.jpg" minW="40%" mawW="40%" height={300} />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        First click on the Apple logo in the upper left corner of the screen.
      </Heading>
    </Container>
  </Wrap>
);

const Step2 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/mac 2.jpg" minW="40%" mawW="40%" height={300} />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        Select "System Preferences"
      </Heading>
    </Container>
  </Wrap>
);

const Step3 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/mac 3.jpg" minW="40%" mawW="40%" height={300} />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        Select “Keyboard”, after opening "System Preferences", select "input
        Sources" and click on the "+" sign in the lower left corner.
      </Heading>
    </Container>
  </Wrap>
);

const Step4 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/mac 4.jpg" minW="40%" mawW="40%" height={300} />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        In the pop-up input method list, select “Korean”, Then in the list of
        Korean input methods on the right, select the one you want to use, and
        then click "Add". We suggest you choose 2-Set Korean because it is the
        only national standard for Hangul keyboard.
      </Heading>
    </Container>
  </Wrap>
);

const Step5 = (
  <Container minW="60vw">
    <Divider></Divider>
    <Heading as="h2" size="md" textAlign="center">
      In the pop-up input method list, select “Korean”, Then in the list of
      Korean input methods on the right, select the one you want to use, and
      then click "Add". We suggest you choose 2-Set Korean because it is the
      only national standard for Hangul keyboard.
    </Heading>
  </Container>
);

const macSteps = [
  { label: 'Step 1', description: 'Starting', content: Step1 },
  { label: 'Step 2', description: 'System Preferences', content: Step2 },
  { label: 'Step 3', description: 'Input Sources', content: Step3 },
  { label: 'Step 4', description: 'Set Korean Keyboard', content: Step4 },
  { label: 'Step 5', description: 'Selection', content: Step5 },
];

export { macSteps };
