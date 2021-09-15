const calculateScore = (accuracy, wpm) => (wpm * (accuracy / 100)).toFixed(2);

export { calculateScore };
