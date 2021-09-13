import * as React from 'react';

import { Flex, Text } from '@chakra-ui/react';

const stylesCss = {
  center: {
    display: " -webkit-box",
    "-webkit-box-align": "center",
    "-webkit-box-pack": "center",
  },
  textCenter: {
    textAlign: 'center'
  },
  img:{
    height:'400px',
  }
}

const Step1 = (
  <div >
    <div style={stylesCss.center}>
      <img src="/images/mac 1.jpg" height={500} width={500} style={stylesCss.img} />
    </div>
    <div style={stylesCss.textCenter}>
      <Text>
        First click on the Apple logo in the upper left corner of the screen.
      </Text>
    </div>
  </div>
);

const Step2 = (
  <div>

    <div style={stylesCss.center}>
      <img src="/images/mac 2.jpg" height={500} width={500} style={stylesCss.img} />
    </div>
    <div style={stylesCss.textCenter}>
      Select "System Preferences".
    </div>
  </div>
);

const Step3 = (
  <div>
    <div style={stylesCss.center}>
      <img src="/images/mac 3.jpg" height={300} width={500} style={stylesCss.img} />

    </div>
    <div style={stylesCss.textCenter}>
      Select “Keyboard”, after opening "System Preferences", select "input Sources" and click on the "+" sign in the lower left corner.
    </div>
  </div>
);

const Step4 = (
  <div>
    <div style={stylesCss.center}>
      <img src="/images/mac 4.jpg" height={300} width={500} style={stylesCss.img} />
    </div>
    <div style={stylesCss.textCenter}>
      In the pop-up input method list, select “Korean”, Then in the list of Korean input methods on the right, select the one you want to use, and then click "Add". We suggest you choose 2-Set Korean because it is the only national standard for Hangul keyboard.
    </div>
  </div>
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
  { label: 'Step 2', description: 'System Preferences', content: Step2 },
  { label: 'Step 3', description: 'Input sources', content: Step3 },
  { label: 'Step 4', description: 'Set Korean keyboard', content: Step4 },
  { label: 'Step 5', description: 'Congratulation', content: Step5 },
];

export { macSteps };
