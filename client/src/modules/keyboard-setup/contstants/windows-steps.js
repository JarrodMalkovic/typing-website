import * as React from 'react';

import { Wrap, Container, Image, Divider, Heading,Center,Text,HStack} from '@chakra-ui/react';

const Step1 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/Windows_1.png" height={250} borderRadius = "2%"/>
    <Divider></Divider>
    <Container minW="60vw">
      <Center>
      <Heading as="h2" size="md" textAlign="justify">
        <Text  margin = "10px"> 1. Select the "Start" button. </Text> 
        <Text  margin = "10px"> 2. Select "Settings". </Text> 
      </Heading>
      </Center>
    </Container>
  </Wrap>
);

const Step2 = (
  <Wrap position="absolute" justify="center">
    <Image src="/images/Windows_2.png" height={400} borderRadius = "2%"/>
    <Divider></Divider>
    <Container minW="60vw">
      <Center>
      <Heading as="h2" size="md" textAlign="justify">
        <Text  margin = "10px"> 3. Select "Time & Language". </Text> 
      </Heading>
      </Center>
    </Container>
  </Wrap>
);

const Step3 = (
  <Wrap position="absolute" justify="center">
    <HStack>
      <Image src="/images/Windows_3.png" height={400} borderRadius = "2%"/>
      <Image src="/images/Windows_4.png" height={400} borderRadius = "2%"/>
    </HStack>
      <Divider></Divider>
      <Container minW="60vw">
        <Center>
        <Heading as="h2" size="md" textAlign="justify">
          <Text  margin = "10px"> 4. Select "Language". </Text> 
          <Text  margin = "10px"> 5. Click on the Following. </Text>
        </Heading>
        </Center>
      </Container>
    
  </Wrap>
);

const Step4 = (
  <Wrap position="absolute" justify="center">
    <HStack>
      <Image src="/images/Windows_5.png" height={400} borderRadius = "2%"/>
      <Image src="/images/Windows_6.png" height={400} borderRadius = "2%"/>
    </HStack>
      <Divider></Divider>
      <Container minW="60vw">
        <Center>
        <Heading as="h2" size="md" textAlign="justify">
          <Text  margin = "10px"> 6. Type "Korean" in the box. </Text> 
          <Text  margin = "10px"> 7. Then a select the following option. Click "Next". </Text>
          <Text  margin = "10px"> 8. Ensure that you selected the correct option. Click "Install".</Text>
        </Heading>
        </Center>
      </Container>
    
  </Wrap>
);

const Step5 = (
  <Wrap position="absolute" justify="center">
    <HStack>
      <Image src="/images/Windows_7.png" height={400} borderRadius = "2%"/>
      <Image src="/images/Windows_8.png" height={400} borderRadius = "2%"/>
    </HStack>
      <Divider></Divider>
      <Container minW="60vw">
        <Center>
        <Heading as="h2" size="md" textAlign="justify">
          <Text  margin = "10px"> 9. Now the Korean Keyboard is available for use. </Text> 
          <Text  margin = "10px"> 10. Ensure that "2-Beolsik" keyboard type is selected. </Text>
          <Text  margin = "10px"> 11. You Should be able to switch to Korean Keyboard as seen from the bottom righ corner of the screen.</Text>
        </Heading>
        </Center>
      </Container>
    
  </Wrap>
);

const windowsSteps = [
  { label: 'Step 1', description: 'Starting', content: Step1 },
  { label: 'Step 2', description: 'Adding a Language', content: Step2 },
  { label: 'Step 3', description: 'Setting Korean Keyboard', content: Step3 },
  { label: 'Step 4', description: 'Continue', content: Step4 },
  { label: 'Step 5', description: 'Final Step', content: Step5 }
];

export { windowsSteps };
