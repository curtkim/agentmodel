var dist = Infer({
  model() {
    var n = uniformDraw([0, 1, 2]);
    factor(n * n);
    return n;
  }
});

dist