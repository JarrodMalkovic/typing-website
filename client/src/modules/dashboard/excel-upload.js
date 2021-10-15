import * as React from 'react';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import { Text, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const getColor = ({
  isDragAccept,
  isDragReject,
  isDragActive,
  defaultColor,
  isInvalid,
}) => {
  if (isDragAccept) {
    return '#00e676';
  }

  if (isDragReject || isInvalid) {
    return 'rgb(252, 129, 129)';
  }

  if (isDragActive) {
    return '#2196f3';
  }

  return defaultColor;
};

const ExcelUpload = ({ setFieldValue, isInvalid }) => {
  const [file, setFile] = React.useState(null);
  const defaultColor = useColorModeValue(
    'rgb(226, 232, 240)',
    'rgba(255, 255, 255, 0.16)',
  );

  const readExcel = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: 'buffer' });
      const questions = [];

      wb.SheetNames.forEach((wsName) => {
        const ws = wb.Sheets[wsName];
        const data = [{ exercise: wsName }];
        data.push(XLSX.utils.sheet_to_json(ws));
        questions.push(data);
      });

      setFieldValue('data', questions);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: '',
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      readExcel(acceptedFiles[0]);
    },
  });

  return (
    <Box>
      <Flex
        display="flex"
        textAlign="center"
        padding="30px"
        borderRadius="5px"
        color="#d1d5db"
        border="dashed"
        borderWidth="2px"
        borderColor={getColor({
          isDragActive,
          isDragAccept,
          isDragReject,
          defaultColor,
          isInvalid,
        })}
        {...getRootProps({
          isDragActive,
          isDragAccept,
          isDragReject,
        })}>
        <input {...getInputProps()} />

        <Text size="sm">
          Drag and drop an excel file here, or click to select a file
        </Text>
      </Flex>
      {file && (
        <Text fontSize="sm" mt="2">
          {file.path} - {file.size}kb
        </Text>
      )}
    </Box>
  );
};

ExcelUpload.propTypes = {
  setFieldValue: PropTypes.func,
};

export default ExcelUpload;
