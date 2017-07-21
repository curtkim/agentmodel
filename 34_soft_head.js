var softHeads = Infer({
  model() {
    var a = flip(0.5);
    var b = flip(0.5);
    var c = flip(0.5);
    factor(a + b + c);
    return a;
  }
});

softHeads