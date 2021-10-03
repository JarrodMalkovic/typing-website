import * as React from 'react';

import { Button, ButtonGroup } from '@chakra-ui/react';

import PropTypes from 'prop-types';

const StepButtons = ({ numSteps, activeStep, nextStep, prevStep }) => {
  return (
    <ButtonGroup>
      <Button
        size="sm"
        color ="white"
        backgroundColor = "#39aae1"
        isDisabled={activeStep === 0}
        onClick={prevStep} 
        _hover={{backgroundColor: "#f52d56"}}>
        Prev
      </Button>
      <Button 
        size="sm" 
        color ="white"
        onClick={nextStep} 
        disabled={numSteps === activeStep} 
        backgroundColor = "#39aae1" 
        _hover={{backgroundColor: "#f52d56"}}>
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
