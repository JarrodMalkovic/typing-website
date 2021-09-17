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
    <Image src="/images/Mac - Step 1.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        <Text  margin = "10px"> 1. Click on the Apple logo in the upper left corner of the screen.</Text> 
        <Text  margin = "10px"> 2. Select "System Preferences". </Text> 
      </Heading>
    </Container>
  </Wrap>
);

const Step2 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/Mac - Step 2.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
      <Text  margin = "10px"> 3. Select "Keyboard".</Text> 
      <Text  margin = "10px"> 4. Select "input Sources".</Text> 
      <Text  margin = "10px"> 5. Click on the "+" sign in the bottom left corner.</Text>
      </Heading>
    </Container>
  </Wrap>
);

const Step3 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/Mac - Step 3.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        <Text  margin = "10px"> 6. In the pop-up input method list, select “Korean”. </Text>
        <Text  margin = "10px"> 7. Then in the list of Korean input methods on the right, 
        select the one you want to use, and then click "Add". 
        We suggest you choose 2-Set Korean because it is the
        only national standard for Hangul keyboard.</Text>
      </Heading>
    </Container>
  </Wrap>
);

const Step4 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/Mac - Step 4.png" minW="40%" mawW="40%" height={300} borderRadius = "2%"/>
    <Divider></Divider>
    <Container minW="60vw">
      <Heading as="h2" size="md" textAlign="center">
        8. Ensure that your the 2-Set Korean Keyboard is your default keyboard. 
      </Heading>
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
