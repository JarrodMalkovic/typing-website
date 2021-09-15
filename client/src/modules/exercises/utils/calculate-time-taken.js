const calculateTimeTaken = (startDate, endDate) => {
  const diff = startDate.getTime() - endDate.getTime();
  return Math.abs(diff / 1000);
};

export { calculateTimeTaken };
