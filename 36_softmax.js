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

var alpha = 1;

var softMaxAgent = function(state) {
  return Infer({
    model() {

      var action = uniformDraw(actions);

      var expectedUtility = function(action) {
        return expectation(Infer({
          model() {
            return utility(transition(state, action));
          }
        }));
      };

      factor(alpha * expectedUtility(action));

      return action;
    }
  });
};

// The noise parameter α modulates between random choice (α=0)
// and the perfect maximization (α=∞) of the maxEUAgent

softMaxAgent('initialState')