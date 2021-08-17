import * as React from 'react';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

const ExerciseHelpModal = ({ isOpen, onClose, finalRef }) => {
  return (
    <Modal
      isCentered
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Exercise Instructions</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          Type the phrase you see in korean in the text box and press enter when
          you are done to continue to the next question
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ExerciseHelpModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  finalRef: PropTypes.object,
};

export default ExerciseHelpModal;
