import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Text,
  Box,
  Flex,
  Center,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
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

const ImageUpload = ({ setFieldValue, isInvalid }) => {
  const [file, setFile] = React.useState(null);
  const defaultColor = useColorModeValue(
    'rgb(226, 232, 240)',
    'rgba(255, 255, 255, 0.16)',
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'image/*',
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
          Drag and drop an image here, or click to select an image
        </Text>
      </Flex>{' '}
      {file && (
        <>
          <Text mt="2" fontSize="sm">
            Exercise Image Preview
          </Text>
          <Center>
            <Image src={file} />
          </Center>
        </>
      )}
    </Box>
  );
};

ImageUpload.propTypes = {
  setFieldValue: PropTypes.func,
};

export default ImageUpload;
