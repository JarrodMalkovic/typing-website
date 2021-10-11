import * as React from 'react';
import {
  VStack,
  Text,
  ModalBody,
  ModalFooter,
  FormControl,
  ButtonGroup,
  FormLabel,
  Box,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import ExcelUpload from './excel-upload';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';
import { BASE_API_URL } from '../../common/contstants/base-api-url';
import { useMutation, useQueryClient } from 'react-query';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { getRelatedCacheKeys } from '../../common/utils/get-related-cache-keys';
import { displayErrors } from '../../common/utils/display-errors';

const createQuestions = async (body) => {
  const { data } = await axios.post(
    `${BASE_API_URL}/api/upload-questions/`,
    {'data': body.questions},
  );

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

const generateEmptyTemplate = async () => {
  const wb = { SheetNames: [], Sheets: [] };
  const exercises = await getExercises();
  console.log(exercises);

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
};

const generateSampleTemplate = async () => {
  const wb = { SheetNames: [], Sheets: [] };
  const exercises = await getExercises();

  // for each exercise, create a worksheet and append that to the workbook
  for (const exercise of exercises) {
    const exercise_name = exercise['exercise_name'];
    const exercise_slug = exercise['exercise_slug'];

    // Does not work with dictation
    if (!exercise.allow_audio_files_in_questions) {
      const questions = await getQuestions(exercise_slug);

      const currentWs = XLSX.utils.json_to_sheet(questions);
      wb.SheetNames.push(exercise_name);
      wb.Sheets[exercise_name] = currentWs;
    }
  }

  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });
  FileSaver.saveAs(data, `KeyKoreaEmptyTemplate.xlsx`);
};

const AddMultipleQuestions = ({ onClose }) => {
  const queryClient = useQueryClient();

  const { mutate, isError, isLoading, error } = useMutation(createQuestions, {
    onSuccess: async () => {
      onClose();

      await queryClient.refetchQueries(['dashboard'], { active: true });
    },
  });

  return (
    <Formik
      initialValues={{
        questions: null,
      }}
      onSubmit={mutate}>
      {({ values, setFieldValue }) => (
        <Form>
          <ModalBody>
            <VStack w="full" textAlign="left" spacing="4">
              <Text textAlign="left" w="full">
                {isError && displayErrors(error)}
                Placeholder text which describes this form asdas das dasd
              </Text>
              <Box textAlign="left" w="full">
                <Button
                  onClick={generateEmptyTemplate}
                  color="blue.400"
                  size="sm"
                  variant="ghost">
                  Download empty template
                </Button>
              </Box>
              <Box textAlign="left" w="full">
                <Button
                  onClick={generateSampleTemplate}
                  color="blue.400"
                  size="sm"
                  variant="ghost">
                  Download sample template
                </Button>
              </Box>
              <Field name="questions">
                {({ field, form }) => (
                  <FormControl>
                    <ExcelUpload setFieldValue={setFieldValue} />
                    <FormErrorMessage>{form.errors.questions}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box maxH="200px" overflowY="auto" w="full">
                <VStack w="full" spacing={4}>
                  {values.questions &&
                    values.questions.map((exercise) => (
                      <Box w="full">
                        <Text>
                          {exercise[0].exercise} questions to be added:
                        </Text>
                        {exercise[1].map((question) => (
                          <Text fontSize="sm">
                            {question.subexercise} - {question.question} -{' '}
                            {question.translation}
                          </Text>
                        ))}
                      </Box>
                    ))}
                </VStack>
              </Box>
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
