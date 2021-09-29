import * as React from 'react';

import { MenuButton, Button, MenuList, MenuItem, Menu } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { exercises } from '../../../common/contstants/exercises';

const options = [
  { category: 'All Exercises', name: 'All Exercises' },
  { category: 'challenge', name: 'Challenge Mode' },
  ...Object.entries(exercises).map(([slug, value]) => {
    return { category: slug, name: value.name };
  }),
];

const LeaderboardMenu = ({ setCategory }) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Select Category
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem onClick={() => setCategory(option)}>{option.name}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LeaderboardMenu;
