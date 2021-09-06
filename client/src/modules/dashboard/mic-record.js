import * as React from 'react';
import ReactMicRecord from 'react-mic-record';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useTheme } from '@emotion/react';

/*
    This is a wrapper around the ReactMicRecord library. This wrapper was created as the prop 'backgroundColor' which ReactMicRecord
    uses conflicts with a prop by the same name from the Chakra Styling Props which causes unexpected results when trying to style the background color
    as a Chakra Component
*/
const ReactMicRecordWrapper = (props) => {
  const theme = useTheme();

  return (
    <ReactMicRecord
      strokeColor={theme.colors.blue['400']}
      backgroundColor={useColorModeValue('white', theme.colors.gray['700'])}
      {...props}
    />
  );
};

export default ReactMicRecordWrapper;
