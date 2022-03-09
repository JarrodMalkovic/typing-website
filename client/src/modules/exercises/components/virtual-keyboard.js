import { Box, Center, useColorMode } from '@chakra-ui/react';
import * as React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { Resizable } from 'react-resizable';
import PropTypes from 'prop-types';
import 'react-resizable/css/styles.css';

const keyMappings = {
  ' ': '{space}',
  backspace: '{bksp}',
  enter: '{enter}',
  shift: '{shift}',
  capslock: '{lock}',
  // keyq: 'ㅂ',
  // keyw: 'ㅈ',
  // keye: 'ㄷ',
  // keyr: 'ㄱ',
  // keyt: 'ㅛ',
  // keyy: 'ㅛ',
  // keyu: 'ㅕ',
  // keyi: 'ㅑ',
  // keyo: 'ㅐ',
  // keyp: 'ㅔ',
  // keya: 'ㅁ',
  // keys: 'ㄴ',
  // keyd: 'ㅇ',
  // keyf: 'ㄹ',
  // keyg: 'ㅎ',
  // keyh: 'ㅗ',
  // keyj: 'ㅓ',
  // keyk: 'ㅏ',
  // keyl: 'ㅣ',
};

const VirtualKeyboard = ({ inputRef }) => {
  const { colorMode } = useColorMode();
  const boxRef = React.useRef();

  const [dimensions, setDimensions] = React.useState({
    width: 450,
    height: 100,
  });

  const handleResize = (event, { element, size, handle }) => {
    setDimensions({
      width: Math.min(800, Math.max(size.width, 300)),
      height: size.height,
    });
  };

  const handleKeyDown = (event) => {
    const dataSkbtn =
      keyMappings[event.key.toLowerCase()] ||
      keyMappings[event.code.toLowerCase()] ||
      event.key.toLowerCase();

    const key = document.querySelector(`div[data-skbtn="${dataSkbtn}"]`);
    if (key) key.classList.add(colorMode === 'light' ? 'down' : 'down-dark');
  };

  const handleKeyUp = (event) => {
    const dataSkbtn =
      keyMappings[event.key.toLowerCase()] ||
      keyMappings[event.code.toLowerCase()] ||
      event.key.toLowerCase();

    const key = document.querySelector(`div[data-skbtn="${dataSkbtn}"]`);
    if (key) key.classList.remove(colorMode === 'light' ? 'down' : 'down-dark');
  };

  React.useEffect(() => {
    if (!inputRef || !inputRef.current) {
      return;
    }

    inputRef.current.addEventListener('keyup', handleKeyUp);
    inputRef.current.addEventListener('keydown', handleKeyDown);

    return () => {
      if (inputRef.current)
        inputRef.current.removeEventListener('keyup', handleKeyUp);

      if (inputRef.current)
        inputRef.current.removeEventListener('keydown', handleKeyDown);
    };
  }, [colorMode]);

  return (
    <Center>
      <Resizable width={dimensions.width} onResize={handleResize}>
        <Box
          width={dimensions.width + 'px'}
          maxHeight={'100%'}
          maxWidth={'100%'}
          ref={boxRef}>
          <Center>
            <Keyboard
              mergeDisplay={true}
              theme={colorMode === 'light' ? '' : 'hg-theme-default myTheme1'}
              layout={
                dimensions.width < 500
                  ? {
                      default: [
                        'ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ',
                        'ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ',
                        '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ {bksp}',
                        '{numbers} {space} {ent}',
                      ],
                      shift: [
                        'Q W E R T Y U I O P',
                        'A S D F G H J K L',
                        '{shift} Z X C V B N M {bksp}',
                        '{numbers} {space} {ent}',
                      ],
                      numbers: ['1 2 3', '4 5 6', '7 8 9', '{abc} 0 {bksp}'],
                    }
                  : {
                      default: [
                        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                        '{tab} ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ \\',
                        '{capslock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ [ ] {ent}',
                        '{shift} ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {shift}',
                        '{space}',
                      ],
                      shift: [
                        'Q W E R T Y U I O P',
                        'A S D F G H J K L',
                        '{shift} Z X C V B N M {bksp}',
                        '{numbers} {space} {ent}',
                      ],
                      numbers: ['1 2 3', '4 5 6', '7 8 9', '{abc} 0 {bksp}'],
                    }
              }
              display={
                dimensions.width < 500
                  ? {
                      '{numbers}': '123',
                      '{ent}': 'return',
                      '{escape}': 'esc ⎋',
                      '{tab}': 'tab ⇥',
                      '{bksp}': '⌫',
                      '{capslock}': 'caps lock ⇪',
                      '{shift}': '⇧',
                      '{controlleft}': 'ctrl ⌃',
                      '{controlright}': 'ctrl ⌃',
                      '{altleft}': 'alt ⌥',
                      '{altright}': 'alt ⌥',
                      '{metaleft}': 'cmd ⌘',
                      '{metaright}': 'cmd ⌘',
                      '{abc}': 'ABC',
                    }
                  : {
                      '{numbers}': '123',
                      '{ent}': 'enter ↵',
                      '{escape}': 'esc ⎋',
                      '{tab}': 'tab ⇥',
                      '{bksp}': '⌫',
                      '{capslock}': 'caps',
                      '{shift}': 'shift ⇧',
                      '{controlleft}': 'ctrl ⌃',
                      '{controlright}': 'ctrl ⌃',
                      '{altleft}': 'alt ⌥',
                      '{altright}': 'alt ⌥',
                      '{metaleft}': 'cmd ⌘',
                      '{metaright}': 'cmd ⌘',
                      '{abc}': 'ABC',
                    }
              }
            />
          </Center>
        </Box>
      </Resizable>
    </Center>
  );
};

VirtualKeyboard.propTypes = {
  inputRef: PropTypes.element,
};

export default VirtualKeyboard;
