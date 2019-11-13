function sum(a, b) {
  return a + b;
}

function sumOf(numbers) {
  // let result = 0;
  // numbers.forEach(num => {
  //   result += num;
  // });
  // return result;
  return numbers.reduce((acc, current) => acc + current, 0);
}

exports.sum = sum;
exports.sumOf = sumOf;
