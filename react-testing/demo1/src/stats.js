exports.max = numbers => Math.max(...numbers);

exports.min = numbers => Math.min(...numbers);

exports.avg = numbers => {
  const sum = numbers.reduce((acc, current) => acc + current, 0);
  return sum / numbers.length;
};

exports.median = numbers => {
  const sortArr = numbers.sort((a, b) => a - b);
  const { length } = numbers;
  const middle = Math.floor(length / 2);

  return length % 2 === 0
    ? (numbers[middle - 1] + numbers[middle]) / 2
    : numbers[middle];
};

exports.mode = numbers => {
  const counts = new Map();
  numbers.forEach(num => {
    const count = counts.get(num) || 0;
    counts.set(num, count + 1);
  });

  const maxCount = Math.max(...counts.values());
  const modes = [...counts.keys()].filter(num => counts.get(num) === maxCount);
  if (modes.length === numbers.length) {
    return null;
  }
  if (modes.length > 1) {
    return modes;
  }
  return modes[0];
};
