var dist = Infer({
  model() {
    var n = uniformDraw([1, 2, 3])
    console.log(n)
    factor(n)
    return n
  }
})

dist