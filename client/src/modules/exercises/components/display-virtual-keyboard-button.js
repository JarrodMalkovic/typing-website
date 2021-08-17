import * as React from 'react';

import { Icon, IconButton, Tooltip } from '@chakra-ui/react';

import { FaRegKeyboard } from 'react-icons/fa';
import PropTypes from 'prop-types';

const DisplayVirtualKeyboardButton = ({
  setShowVirtualKeyboard,
  showVirtualKeyboard,
}) => {
  return (
    <Tooltip
      label={
        showVirtualKeyboard
          ? 'Hide Virtual Keyboard'
          : 'Display on screen keyboard'
      }>
      <IconButton
        onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
        icon={<Icon as={FaRegKeyboard} />}
      />
    </Tooltip>
  );
};

DisplayVirtualKeyboardButton.propTypes = {
  setShowVirtualKeyboard: PropTypes.func,
  showVirtualKeyboard: PropTypes.bool,
};

export default DisplayVirtualKeyboardButton;
