import * as React from 'react';

import { Button, ButtonGroup } from '@chakra-ui/react';

import PropTypes from 'prop-types';

const StepButtons = ({ numSteps, activeStep, nextStep, prevStep }) => {
  return (
    <ButtonGroup>
      <Button
        size="sm"
        variant="ghost"
        isDisabled={activeStep === 0}
        onClick={prevStep}>
        Prev
      </Button>
      <Button size="sm" onClick={nextStep} disabled={numSteps === activeStep}>
        Next
      </Button>
    </ButtonGroup>
  );
};

StepButtons.propTypes = {
  numSteps: PropTypes.number,
  activeStep: PropTypes.number,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
};

export default StepButtons;
