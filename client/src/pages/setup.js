import * as React from 'react';

import {
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
  Spinner,
  VStack,
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

const getSteps = os => {
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
    <Container pt='8' maxW='container.xl'>
      <VStack spacing={5} width='100%' align='stretch'>
        {os ? (
          <>
            <Heading>Setup Hangul Keyboard on {os}</Heading>
            <Steps activeStep={activeStep}>
              {steps.map(({ label, content, description }) => (
                <Step label={label} key={label} description={description}>
                  {content}
                </Step>
              ))}
            </Steps>
            {activeStep === steps.length && (
              <StepsCompletedPrompt os={os} reset={reset} />
            )}
            <Flex>
              <ChangeOsMenu setOs={setOs} resetSteps={reset} />
              <Spacer />
              <StepButtons
                activeStep={activeStep}
                numSteps={steps.length}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </Flex>
          </>
        ) : (
          <Center>
            <Spinner color='blue.500' />
          </Center>
        )}
      </VStack>
    </Container>
  );
};

export default Setup;
