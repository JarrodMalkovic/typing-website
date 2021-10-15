import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import {
  FormControl,
  FormLabel,
  Text,
  Box,
  Flex,
  useColorModeValue,
  Center,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import MicRecord from './mic-record';
import { RiRecordCircleLine, RiStopCircleLine } from 'react-icons/ri';
import ReactAudioPlayer from 'react-audio-player';
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

const AudioUpload = ({ setFieldValue, isInvalid }) => {
  const [audioBlobUrl, setAudioBlobUrl] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);

  const defaultColor = useColorModeValue(
    'rgb(226, 232, 240)',
    'rgba(255, 255, 255, 0.16)',
  );

  React.useEffect(() => {
    return () => setFieldValue('audio_file', null);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: 'audio/*',
    onDrop: (acceptedFiles) => {
      setAudioBlobUrl(URL.createObjectURL(acceptedFiles[0]));
      setFieldValue('audio_file', acceptedFiles[0]);
    },
  });

  return (
    <>
      <FormControl>
        <Tabs isFitted>
          <TabList>
            <Tab>Upload Existing Audio</Tab>
            <Tab>Record Audio Now</Tab>
          </TabList>

          <TabPanels>
            <TabPanel pb="0" px="0">
              <>
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
                    Drag and drop some files here, or click to select files
                  </Text>
                </Flex>
              </>
            </TabPanel>
            <TabPanel paddingX="0">
              <>
                <Box
                  width="full"
                  as={MicRecord}
                  record={isRecording}
                  borderRadius="5px"
                  mb="2"
                  onStop={(recorded) => {
                    setAudioBlobUrl(recorded.blobURL);
                    setFieldValue(
                      'audio_file',
                      new File([recorded.blob], 'file', {
                        type: recorded.blob.type,
                      }),
                    );
                  }}
                />

                <Center>
                  <Tooltip
                    label={isRecording ? 'Stop Recording' : 'Start Recording'}>
                    <IconButton
                      fontSize="30px"
                      rounded="100%"
                      backgroundColor={isRecording ? 'red.400' : 'blue.400'}
                      color="white"
                      _hover={{
                        bgColor: isRecording ? 'red.500' : 'blue.500',
                      }}
                      onClick={() => setIsRecording(!isRecording)}
                      icon={
                        isRecording ? (
                          <RiStopCircleLine />
                        ) : (
                          <RiRecordCircleLine />
                        )
                      }
                    />
                  </Tooltip>
                </Center>
              </>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {audioBlobUrl && (
          <FormControl mt="2">
            <FormLabel>Audio Preview</FormLabel>
            <Box w="full" as={ReactAudioPlayer} src={audioBlobUrl} controls />
          </FormControl>
        )}
      </FormControl>
    </>
  );
};

AudioUpload.propTypes = {
  setFieldValue: PropTypes.func,
};

export default AudioUpload;
