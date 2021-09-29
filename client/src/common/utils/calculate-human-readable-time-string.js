const calculateHumanReadableTimeString = (time) => {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = ((time % (1000 * 60)) / 1000).toFixed(2);

  return `${days ? days + 'd ' : ''} ${hours || days ? hours + 'h ' : ''} ${
    minutes || hours ? minutes + 'm ' : ''
  } ${seconds || minutes ? seconds + 's' : '0s'}`;
};

export { calculateHumanReadableTimeString };
