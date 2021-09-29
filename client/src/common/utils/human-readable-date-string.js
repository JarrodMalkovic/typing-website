const humanReadableDateString = (d) => {
  const date = new Date(d);
  return date.toDateString();
};

export { humanReadableDateString };
