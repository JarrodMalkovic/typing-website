import * as React from 'react';
import {
  VStack,
  Text,
  ModalBody,
  ModalFooter,
  FormControl,
  ButtonGroup,
  useToast,
  Checkbox,
  FormLabel,
  Box,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Button,
} from '@chakra-ui/react';
import ExcelUpload from './excel-upload';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import { useMutation, useQueryClient } from 'react-query';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { displayErrors } from '../../common/utils/display-errors';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  data: Yup.mixed().required('Required'),
  replace: Yup.bool().required(),
});

const createQuestions = async (body) => {
  await axios.post(`${BASE_API_URL}/api/upload-questions/`, body);

  return body;
};

const getExercises = async () => {
  const { data } = await axios.get(`${BASE_API_URL}/api/exercises/`);
  return data;
};

const getQuestions = async (slug) => {
  const { data } = await axios.get(
    `${BASE_API_URL}/api/download-questions/${slug}/`,
  );

  return data;
};

const generateEmptyTemplate = async (setIsGeneratingEmptyTemplate) => {
  setIsGeneratingEmptyTemplate(true);

  const wb = { SheetNames: [], Sheets: [] };
  const exercises = await getExercises();

  exercises.forEach((exercise) => {
    if (exercise.allow_audio_files_in_questions) {
      return;
    }

    const currentWs = XLSX.utils.json_to_sheet([
      {
        subexercise: '',
        question: '',
        translation: '',
      },
    ]);

    wb.SheetNames.push(exercise['exercise_name']);
    wb.Sheets[exercise['exercise_name']] = currentWs;
  });

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });

  FileSaver.saveAs(data, `KeyKoreaEmptyTemplate.xlsx`);

  setIsGeneratingEmptyTemplate(false);
};

const generateSampleTemplate = async (setIsGeneratingSampleTemplate) => {
  setIsGeneratingSampleTemplate(true);

  const wb = { SheetNames: [], Sheets: [] };
  const exercises = await getExercises();

  await Promise.all(
    exercises.map(async (exercise) => {
      const exercise_name = exercise['exercise_name'];
      const exercise_slug = exercise['exercise_slug'];

      if (!exercise.allow_audio_files_in_questions) {
        const questions = await getQuestions(exercise_slug);

        const currentWs = XLSX.utils.json_to_sheet(questions);
        wb.SheetNames.push(exercise_name);
        wb.Sheets[exercise_name] = currentWs;
      }
    }),
  );

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });

  FileSaver.saveAs(data, `KeyKoreaSampleTemplate.xlsx`);
  setIsGeneratingSampleTemplate(false);
};

const AddMultipleQuestions = ({ onClose }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isGeneratingSampleTemplate, setIsGeneratingSampleTemplate] =
    React.useState(false);
  const [isGeneratingEmptyTemplate, setIsGeneratingEmptyTemplate] =
    React.useState(false);

  const { mutate, isError, isLoading, error } = useMutation(createQuestions, {
    onSuccess: async () => {
      onClose();

      toast({
        title: 'Created Questions',
        description: 'You have successfully created new questions',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });

      await queryClient.refetchQueries(['dashboard'], { active: true });
    },
  });

  return (
    <Formik
      initialValues={{
        data: null,
        replace: false,
      }}
      validationSchema={validationSchema}
      onSubmit={mutate}>
      {({ values, setFieldValue }) => (
        <Form>
          <ModalBody>
            <VStack w="full" textAlign="left" spacing="4">
              {isError && displayErrors(error, 0)}
              {values.replace && (
                <Alert status="warning">
                  <AlertIcon />
                  You have selected "Replace all current questions". This option
                  will delete all questions currently stored in the database and
                  replace them with the new questions in the provided excel file
                </Alert>
              )}

              <Box textAlign="left" w="full">
                <Button
                  onClick={() =>
                    generateEmptyTemplate(setIsGeneratingEmptyTemplate)
                  }
                  color="blue.400"
                  size="sm"
                  variant="ghost">
                  {isGeneratingEmptyTemplate
                    ? 'Generating...'
                    : 'Download empty template'}
                </Button>
              </Box>
              <Box textAlign="left" w="full">
                <Button
                  onClick={() =>
                    generateSampleTemplate(setIsGeneratingSampleTemplate)
                  }
                  color="blue.400"
                  size="sm"
                  variant="ghost">
                  {isGeneratingSampleTemplate
                    ? 'Generating...'
                    : 'Download sample template'}
                </Button>
              </Box>
              <Field name="data">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={values.data == null && form.errors.data}>
                    <ExcelUpload
                      isInvalid={values.data == null && form.errors.data}
                      setFieldValue={setFieldValue}
                    />
                    <FormErrorMessage>{form.errors.data}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box maxH="200px" overflowY="auto" w="full">
                <VStack w="full" spacing={4}>
                  {values.data &&
                    values.data.map((exercise) => (
                      <Box w="full">
                        <Text>
                          {exercise[0].exercise} questions to be added:
                        </Text>
                        {exercise[1].length ? (
                          exercise[1].map((question) => (
                            <Text fontSize="sm">
                              {question.subexercise} - {question.question} -{' '}
                              {question.translation}
                            </Text>
                          ))
                        ) : (
                          <Text fontSize="sm">None</Text>
                        )}
                      </Box>
                    ))}
                </VStack>
              </Box>
              <Field name="replace">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.replace && form.touched.replace}>
                    <Checkbox
                      {...field}
                      id="replace"
                      onChange={(e) =>
                        setFieldValue('replace', e.target.checked)
                      }>
                      Replace all current questions
                    </Checkbox>

                    <FormErrorMessage>{form.errors.replace}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup mt="4">
              <Button onClick={onClose}>Cancel</Button>
              <Button
                isLoading={isLoading}
                variant="solid"
                bgColor="blue.400"
                color="white"
                type="submit"
                _hover={{
                  bgColor: 'blue.500',
                }}>
                Create Questions
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export default AddMultipleQuestions;
