import * as React from 'react';

import { Flex, Text } from '@chakra-ui/react';

const Step1 = (
  <Flex>
    <Text>
      First click on the Apple logo in the upper left corner of the screen.
               
               
    </Text>
    <img src="/images/mac 1.jpg" height={500} width={500}/>
  </Flex>
);

const Step2 = (
  <Flex>
    <Text>
      Select "System Preferences".
               
               
               
    </Text>
    <img src="/images/mac 2.jpg" height={500} width={500}/>
  </Flex>
);

const Step3 = (
  <Flex>
    <Text>
      Select “Keyboard”, after opening "System Preferences", select "input Sources" and click on the "+" sign in the lower left corner.
    </Text>
    <img src="/images/mac 3.jpg" height={500} width={500}/>
  </Flex>
);
               
const Step4 = (
  <Flex>
    <Text>
      In the pop-up input method list, select “Korean”, Then in the list of Korean input methods on the right, select the one you want to use, and then click "Add". We suggest you choose 2-Set Korean because it is the only national standard for Hangul keyboard.
    </Text>
    <img src="/images/mac 4.jpg" height={500} width={500}/>
  </Flex>
);

const Step5 = (
  <Flex>
    <Text>
      You can see that in the input method list on the left, the Korean input method has been added successfully.
    </Text>
  </Flex>
);

const macSteps = [
  { label: 'Step 1', description: 'Starting', content: Step1 },
  { label: 'Step 2', description: 'Setting', content: Step2 },
  { label: 'Step 3', description: 'Setting', content: Step3 },
  { label: 'Step 4', description: 'Setting', content: Step4 },
  { label: 'Step 5', description: 'Congratulation', content: Step5 },
];

export { macSteps };
