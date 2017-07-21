var actions = ['italian', 'french'];

var transition = function(state, action) {
  if (action === 'italian') {
    return 'pizza';
  } else {
    return 'steak frites';
  }
};

var inferenceAgent = function(state) {
  return Infer({
    model() {
      var action = uniformDraw(actions);
      condition(transition(state, action) === 'pizza');
      return action;
    }
  });
}

inferenceAgent("initialState");