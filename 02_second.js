var geometric = function(p) {
  return flip(p) ? 1+ geometric(p) : 1
}

var boundedGemetric = Infer({
  model() {return geometric(0.5)},
  method: 'enumerate',
  maxExecutions: 20
})

console.log(boundedGemetric)