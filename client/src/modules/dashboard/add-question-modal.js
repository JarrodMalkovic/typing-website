import * as React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import {
  Input,
  FormControl,
  FormLabel,
  VStack,
  TabPanels,
  TabPanel,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  TabList,
  Tab,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  ModalFooter,
  ButtonGroup,
  Button,
  FormErrorMessage,
  Stack,
  Tabs,
} from '@chakra-ui/react';
import AudioUpload from './audio-upload';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import PropTypes from 'prop-types';
import { isDictionSlug } from '../exercises/utils/is-diction-slug';
import { isDictionSubexercise } from '../exercises/utils/is-diction-subexercise';
import { useExercises } from '../exercises/hooks/use-exercises';
import { useSubexercises } from '../subexercises/hooks/use-subexercises';
import AddSingleQuestion from './add-single-question';
import AddMultipleQuestions from './add-multi-questions';

const validationSchema = Yup.object({
  subexercise_slug: Yup.string().required('Required!'),
  question: Yup.string().required('Required!').max(100),
  audio_file: Yup.mixed().when(
    ['subexercise_slug'],
    (subexercise_slug, schema) =>
      isDictionSubexercise(subexercise_slug)
        ? schema.required('Required!')
        : schema,
  ),
});

const addQuestion = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach(
    (key) => data[key] && formData.append(key, data[key]),
  );

  const res = await axios.post(`${BASE_API_URL}/api/questions/`, formData);
  return res.data;
};

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
