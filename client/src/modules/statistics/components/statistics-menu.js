import * as React from 'react';

import { MenuButton, Button, MenuList, MenuItem, Menu } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { exercises } from '../../../common/contstants/exercises';
import { useExercises } from '../../exercises/hooks/use-exercises';

const StatisticsMenu = ({ setCategory, ...rest }) => {
  const { data: exercises, isLoading } = useExercises();

  const options =
    isLoading || !exercises
      ? [
          { category: 'All Exercises', name: 'All Exercises' },
          { category: 'challenge', name: 'Challenge Mode' },
        ]
      : [
          { category: 'All Exercises', name: 'All Exercises' },
          { category: 'challenge', name: 'Challenge Mode' },
          ...Object.entries(exercises).map(([key, value]) => {
            return { category: value.exercise_slug, name: value.exercise_name };
          }),
        ];

  return (
    <Menu>
      <MenuButton {...rest} as={Button} rightIcon={<ChevronDownIcon />}>
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

export default StatisticsMenu;
