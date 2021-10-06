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

const AudioUpload = ({ setFieldValue }) => {
  const [audioBlobUrl, setAudioBlobUrl] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);

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
                    console.log(recorded);
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
                  <ButtonGroup border="red" do borderBottom="red">
                    <Tooltip label="Start Recording">
                      <IconButton
                        fontSize="30px"
                        rounded="100%"
                        backgroundColor="blue.400"
                        color="white"
                        onClick={() => setIsRecording(true)}
                        isDisabled={isRecording}
                        icon={<RiRecordCircleLine />}
                      />
                    </Tooltip>
                    <Tooltip label="Stop Recording">
                      <IconButton
                        fontSize="30px"
                        rounded="100%"
                        backgroundColor="blue.400"
                        color="white"
                        onClick={() => setIsRecording(false)}
                        isDisabled={!isRecording}
                        icon={<RiStopCircleLine />}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </Center>
              </>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {audioBlobUrl && (
          <FormControl>
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
