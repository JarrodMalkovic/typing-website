import * as React from 'react';

import {
  IconButton,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const DarkModeToggle = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Tooltip label={useColorModeValue('Enable Dark Mode', 'Disable Dark Mode')}>
      <IconButton
        onClick={toggleColorMode}
        backgroundColor={useColorModeValue('white', 'gray.900')}
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      />
    </Tooltip>
  );
};

export default DarkModeToggle;
