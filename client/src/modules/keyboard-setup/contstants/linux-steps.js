import * as React from 'react';

import { Flex, Text } from '@chakra-ui/react';

const Step1 = (
  <Flex>
    <Text>
      Open System Settings, and select "Input" and click "Korean". Click Install
      Beside "Input method framework" at the top, select "Fcitx" from the
      dropdown.
    </Text>
  </Flex>
);

const Step2 = (
  <Flex>
    <Text>
      Log out and back in again. Right click Fcitx in your system tray (bottom
      right), select Configure. At the bottom left of Fcitx, click the "+" sign.
      Deselect "Only show current language". Add Hangul, and click Ok.
    </Text>
  </Flex>
);

const Step3 = (
  <Flex>
    <Text>
      To type in Korean, open an app that supports Korean fonts (i.e. a web
      browser) and hit "CTRL + Space" to swap between input languages.
    </Text>
  </Flex>
);

const linuxSteps = [
  { label: 'Step 1', description: 'Starting', content: Step1 },
  { label: 'Step 2', description: 'Setting', content: Step2 },
  { label: 'Step 3', description: 'Suggestion', content: Step3 },
];

export { linuxSteps };
