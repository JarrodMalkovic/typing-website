import * as React from 'react';

// Adapted from: https://stackoverflow.com/a/64228857
const Timer = ({ startDate }) => {
  const [timeElapsed, setTimeElapsed] = React.useState('0s');

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const started = Date.parse(startDate);
      const distance = now - started;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeElapsed(
        `${days ? days + 'd ' : ''} ${hours || days ? hours + 'h ' : ''} ${
          minutes || hours ? minutes + 'm ' : ''
        } ${seconds || minutes ? seconds + 's' : ''}`,
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeElapsed;
};

export default Timer;
