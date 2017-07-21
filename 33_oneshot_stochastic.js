///fold: argMax
var argMax = function(f, ar){
  return maxWith(f, ar)[0]
};
///

var actions = ['italian', 'french'];

var transition = function(state, action) {
  var nextStates = ['bad', 'good', 'spectacular'];
  var nextProbs = (action === 'italian') ? [0.2, 0.6, 0.2] : [0.05, 0.9, 0.05];
  return categorical(nextProbs, nextStates);
};

var utility = function(state) {
  var table = {
    bad: -10,
    good: 6,
    spectacular: 8
  };
  return table[state];
};

var maxEUAgent = function(state) {
  var expectedUtility = function(action) {
    return expectation(Infer({
      model() {
        return utility(transition(state, action));
      }
    }));
  };
  return argMax(expectedUtility, actions);
};

maxEUAgent('initialState');