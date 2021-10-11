import * as React from 'react';
import {
  TabPanels,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  TabList,
  Tab,
  ModalHeader,
  ModalCloseButton,
  Tabs,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import AddSingleQuestion from './add-single-question';
import AddMultipleQuestions from './add-multi-questions';

const AddQuestionModal = ({ isOpen, onOpen, onClose }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Question</ModalHeader>
        <ModalCloseButton />
        <Tabs isFitted>
          <TabList mx="5">
            <Tab>Upload One</Tab>
            <Tab>Upload Multiple</Tab>
          </TabList>
          <TabPanels>
            <TabPanel margin="0">
              <AddSingleQuestion onClose={onClose} />
            </TabPanel>
            <TabPanel margin="0">
              <AddMultipleQuestions onClose={onClose} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

AddQuestionModal.propTypes = {
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

export default AddQuestionModal;
