import * as React from 'react';

import { Wrap, Container, Image, Divider, Heading } from '@chakra-ui/react';

const Step1 = (
  <Wrap position="absolute" justify="center">
    <Container minW="60vw">
      <Divider></Divider>
      <Heading as="h2" size="md" textAlign="center">
        Click on the ‘’magnifying glass icon’’ or ‘’Search Windows box’’ on the
        left side of your taskbar. (If you can’t find it, right-click on the
        taskbar and choose Search -> Show search icon).
      </Heading>
    </Container>
  </Wrap>
);

const Step2 = (
  <Wrap position="absolute" justify="center">
    <Container minW="60vw">
      <Divider></Divider>
      <Heading as="h2" size="md" textAlign="center">
        Type “add a language” into the search box. Click on the ‘’Add a language
        to this device’’ under System settings marked with a gear icon.
      </Heading>
    </Container>
  </Wrap>
);

const Step3 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/windows 1.png" minW="40%" mawW="40%" height={300} />
    <Image src="/images/windows 2.png" minW="40%" maxW="40%" height={300} />
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        Under “Region & language” tab click the “+ Add a language”. In "ADD A
        LANGUAGE" settings choose “한국어 Korean” or any other language you
        desire.
      </Heading>
    </Container>
  </Wrap>
);

const Step4 = (
  <Wrap position="absolute" justify="center">
    <Container minW="60vw">
      <Divider></Divider>
      <Heading as="h2" size="md" textAlign="center">
        A pop-up should appear with the notification saying “We are adding a new
        feature to Windows.”. Wait for a bit. This alert prompts you to adjust
        some settings. Unless you have some specific needs and especially if
        it’s your first time using Korean keyboard you may just leave everything
        as it is. Default settings are the most commonly used ones. We suggest
        you choose 2-Set Korean because it is the only national standard for
        Hangul keyboard.
      </Heading>
    </Container>
  </Wrap>
);

const windowsSteps = [
  { label: 'Step 1', description: 'Starting', content: Step1 },
  { label: 'Step 2', description: 'Setting', content: Step2 },
  { label: 'Step 3', description: 'Setting', content: Step3 },
  { label: 'Step 4', description: 'final', content: Step4 },
];

export { windowsSteps };
