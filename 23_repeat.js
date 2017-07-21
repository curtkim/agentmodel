console.log('Fair coins (Bernoulli distribution):');
console.log([flip(0.5), flip(0.5), flip(0.5)]);

console.log('Biased coins (Bernoulli distribution):');
console.log([flip(0.9), flip(0.9), flip(0.9)]);

var coinWithSide = function(){
  return categorical([.45, .45, .1], ['heads', 'tails', 'side']);
};

console.log('Coins that can land on their edge:')
console.log(repeat(5, coinWithSide)); // draw 5 i.i.d samples