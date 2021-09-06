const caculateWPM = (startDate, wordsTyped) => {
  const diff = Date.now() - startDate.getTime();
  return (wordsTyped * (60 / Math.abs(diff / 1000))).toFixed(2);
};

export { caculateWPM };
