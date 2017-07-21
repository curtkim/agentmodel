// Using the stochastic function `flip` we build a function that
// returns 'H' and 'T' with equal probability:
var coin = function() {
  return flip(.5) ? 'H' : 'T'
}

var flips = [coin(), coin(), coin()]

console.log('Some coin flips:')
console.log(flips)