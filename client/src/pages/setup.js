import * as React from 'react';

import {
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Spinner,
  VStack,
  Box,
  Image,
} from '@chakra-ui/react';
import {
  LINUX,
  MAC,
  WINDOWS,
} from '../modules/keyboard-setup/contstants/operating-systems';
import { Step, Steps, useSteps } from 'chakra-ui-steps';

import ChangeOsMenu from '../modules/keyboard-setup/components/change-os-menu';
import StepButtons from '../modules/keyboard-setup/components/step-buttons';
import StepsCompletedPrompt from '../modules/keyboard-setup/components/steps-completed-prompt';
import { getOperatingSystem } from '../modules/keyboard-setup/utils/get-operating-system';
import { linuxSteps } from '../modules/keyboard-setup/contstants/linux-steps';
import { macSteps } from '../modules/keyboard-setup/contstants/mac-steps';
import { windowsSteps } from '../modules/keyboard-setup/contstants/windows-steps';

const getSteps = (os) => {
  switch (os) {
    case WINDOWS:
      return windowsSteps;
    case MAC:
      return macSteps;
    case LINUX:
      return linuxSteps;
    default:
      return windowsSteps;
  }
};

const Setup = () => {
  const [os, setOs] = React.useState(null);
  const [steps, setSteps] = React.useState(getSteps(os));

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  // useEffect's are not ran on the server during prerendering, so it is safe to check for the user's OS in a useEffect hook
  React.useEffect(() => {
    setOs(getOperatingSystem());
  }, []);

  React.useEffect(() => {
    setSteps(getSteps(os));
  }, [os]);

  return (
    <Box position="relative">
      <VStack spacing={5} width="100%">
        <Image
          minW="full"
          opacity="30%"
          linear-gradient="(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.25))"
          src="/images/Basic.png"
        />
        {os ? (
          <>
            <Heading position="absolute">Setup Hangul Keyboard on {os}</Heading>
            <Box position="absolute" spacing={5} minW="100%">
              <Steps
                activeStep={activeStep}
                alignContent="center"
                top="80px"
                maxW="80%"
                minW="80%"
                textAlign="center"
                position="absolute">
                {steps.map(({ label, content, description }) => (
                  <Step label={label} key={label} description={description}>
                    <br></br>
                    {content}
                  </Step>
                ))}
              </Steps>
              {activeStep === steps.length && (
                <StepsCompletedPrompt os={os} reset={reset} />
              )}
              <Flex top="250px" position="absolute">
                <ChangeOsMenu setOs={setOs} resetSteps={reset} />
                <Spacer />
                <StepButtons
                  activeStep={activeStep}
                  numSteps={steps.length}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              </Flex>
            </Box>
          </>
        ) : (
          <Center position="absolute">
            <Spinner color="blue.500" />
          </Center>
        )}
      </VStack>
    </Box>
  );
};

export default Setup;
