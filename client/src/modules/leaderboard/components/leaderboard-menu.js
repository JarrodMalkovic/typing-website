import * as React from 'react';

import { MenuButton, Button, MenuList, MenuItem, Menu } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { exercises } from '../../../common/contstants/exercises';

const options = Object.entries(exercises);

const LeaderboardMenu = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Select Category
      </MenuButton>
      <MenuList>
        <MenuItem>All Exercises</MenuItem>
        <MenuItem>Challenge Mode</MenuItem>
        <MenuItem>Letters</MenuItem>
        <MenuItem>Words</MenuItem>
        <MenuItem>Long Sentences</MenuItem>
        <MenuItem>Diction</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LeaderboardMenu;
