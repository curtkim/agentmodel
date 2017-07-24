var a = Infer({
  model() {
    var action = uniformDraw([-1, 0, 1])
    return action
  }
})

console.log(sample(a))
console.log(a)
expectation(a)