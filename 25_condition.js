var twoHeads = Infer({
  model() {
    var a = flip(0.5);
    var b = flip(0.5);
    var c = flip(0.5);
    condition(a + b + c === 2);
    return a;
  }
});

console.log('Probability of first coin being Heads (given exactly two Heads) : ');
console.log(Math.exp(twoHeads.score(true)));

var moreThanTwoHeads = Infer({
  model() {
    var a = flip(0.5);
    var b = flip(0.5);
    var c = flip(0.5);
    condition(a + b + c >= 2);
    return a;
  }
});

console.log('\Probability of first coin being Heads (given at least two Heads): ');
console.log(Math.exp(moreThanTwoHeads.score(true)));