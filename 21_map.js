// Define a function using two external primitives:
// 1. Javascript's `JSON.stringify` for converting to strings
// 2. Underscore's _.isFinite for checking if a value is a finite number
var coerceToPositiveNumber = function(x) {
  if (_.isFinite(x) && x > 0) {
    return x;
  } else {
    console.log('- Input ' + JSON.stringify(x) +
          ' was not a positive number, returning 1 instead');
    return 1;
  }
};

// Create an array with numbers, an object, an a Boolean
var inputs = [2, 3.5, -1, { key: 1 }, true];

// Map the function over the array
console.log('Processing elements in array ' + JSON.stringify(inputs) + '...');
var result = map(coerceToPositiveNumber, inputs);
console.log('Result: ' + JSON.stringify(result));