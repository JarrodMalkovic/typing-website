import * as React from 'react';
import { caculateWPM } from '../utils/calculate-wpm';

const WPM = ({ startDate, wordsTyped }) => {
  const [wpm, setWPM] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setSeconds(count++);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    setWPM(caculateWPM(startDate, wordsTyped));
  }, [seconds, wordsTyped]);

  return wpm;
};

export default WPM;
