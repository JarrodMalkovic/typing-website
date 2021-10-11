import * as React from 'react';
import * as XLSX from 'xlsx';
import { useDropzone } from 'react-dropzone';
import { Text, Box, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const getColor = ({ isDragAccept, isDragReject, isDragActive }) => {
  if (isDragAccept) {
    return '#00e676';
  }

  if (isDragReject) {
    return '#ff1744';
  }

  if (isDragActive) {
    return '#2196f3';
  }

  return 'rgba(255, 255, 255, 0.16)';
};

const ExcelUpload = ({ setFieldValue }) => {
  const [file, setFile] = React.useState(null);

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

      setFieldValue('questions', questions);
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
        })}
        {...getRootProps({
          isDragActive,
          isDragAccept,
          isDragReject,
        })}>
        <input {...getInputProps()} />

        <Text size="sm">
          Drag and drop some files here, or click to select files
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
