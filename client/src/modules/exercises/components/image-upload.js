import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  FormControl,
  FormLabel,
  Text,
  Box,
  Flex,
  ButtonGroup,
  Center,
  Tabs,
  Tab,
  Image,
  TabList,
  TabPanels,
  VStack,
  TabPanel,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
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

const ImageUpload = ({ setFieldValue }) => {
  const [file, setFile] = React.useState(null);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/png',
    onDrop: (acceptedFiles) => {
      setFieldValue('image_file', acceptedFiles[0]);
      setFile(URL.createObjectURL(acceptedFiles[0]));
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
      </Flex>{' '}
      <Text>Exercise Image Preview</Text>
      <Center>
        <Image src={file} />
      </Center>
    </Box>
  );
};

ImageUpload.propTypes = {
  setFieldValue: PropTypes.func,
};

export default ImageUpload;
