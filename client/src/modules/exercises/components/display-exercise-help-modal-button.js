import * as React from 'react';

import { Icon, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';

import { BiHelpCircle } from 'react-icons/bi';
import ExerciseHelpModal from './exercise-help-modal';
import PropTypes from 'prop-types';

const DisplayExerciseHelpModalButton = ({ inputRef }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip label='Need help?'>
        <IconButton onClick={onOpen} icon={<Icon as={BiHelpCircle} />} />
      </Tooltip>
      <ExerciseHelpModal
        isOpen={isOpen}
        finalRef={inputRef}
        opOpen={onOpen}
        onClose={onClose}
      />
    </>
  );
};

DisplayExerciseHelpModalButton.propTypes = {
  inputRef: PropTypes.object,
};

export default DisplayExerciseHelpModalButton;
