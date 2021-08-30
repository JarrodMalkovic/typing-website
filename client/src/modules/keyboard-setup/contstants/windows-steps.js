import * as React from 'react';

import { Flex, Text } from '@chakra-ui/react';

const Step1 = (
  <Flex>
    <Text>
      Click on the ‘’magnifying glass icon’’ or ‘’Search Windows box’’ on the left side of your taskbar. (If you can’t find it, right-click on the taskbar and choose Search -> Show search icon).
               
      Type “add a language” into the search box. Click on the ‘’Add a language to this device’’ under System settings marked with a gear icon.
    </Text>
  </Flex>
);

const Step2 = (
  <Flex>
    <Text>
      Under “Region & language” tab click the “+ Add a language”.
               
      In "ADD A LANGUAGE" settings choose “한국어 Korean” or any other language you desire.
    </Text>
               
    <img src="/images/windows 1.png" height={500} width={500}/>
               
    <img src="/images/windows 2.png" height={500} width={500}/>
  </Flex>
);

const Step3 = (
  <Flex>
    <Text>
      A pop-up should appear with the notification saying “We are adding a new feature to Windows.”. Wait for a bit. This alert prompts you to adjust some settings. Unless you have some specific needs and especially if it’s your first time using Korean keyboard you may just leave everything as it is. Default settings are the most commonly used ones. We suggest you choose 2-Set Korean because it is the only national standard for Hangul keyboard.
    </Text>
  </Flex>
);

const windowsSteps = [
  { label: 'Step 1', description: 'Starting', content: Step1 },
  { label: 'Step 2', description: 'Setting', content: Step2 },
  { label: 'Step 3', description: 'final', content: Step3 },
];

export { windowsSteps };
