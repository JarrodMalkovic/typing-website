import * as React from 'react';

import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { LINUX, MAC, WINDOWS } from '../contstants/operating-systems';

import { ChevronDownIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

const ChangeOsMenu = ({ resetSteps, setOs }) => {
  const handleClick = (OS) => {
    resetSteps();
    setOs(OS);
  };

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            size="sm"
            variant="ghost"
            isActive={isOpen}
            as={Button}
            rightIcon={<ChevronDownIcon />}>
            Change Operating System
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleClick(WINDOWS)}>{WINDOWS}</MenuItem>
            <MenuItem onClick={() => handleClick(MAC)}>{MAC}</MenuItem>
            <MenuItem onClick={() => handleClick(LINUX)}>{LINUX}</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

ChangeOsMenu.propTypes = {
  resetSteps: PropTypes.func,
  setOs: PropTypes.func,
};

export default ChangeOsMenu;
