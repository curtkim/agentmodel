var binomial = function() {
  var a = flip(0.5);
  var b = flip(0.5);
  var c = flip(0.5);
  return a + b + c;
};

var MyBinomial = Infer({ model: binomial });

console.log([sample(MyBinomial), sample(MyBinomial), sample(MyBinomial)]);
console.log(MyBinomial)
console.log(MyBinomial.score(0))
console.log(MyBinomial.score(1))
console.log(MyBinomial.score(2))
console.log(MyBinomial.score(3))
