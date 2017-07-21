///fold: argMax
var argMax = function(f, ar){
  return maxWith(f, ar)[0]
}
///
// Choose to eat at the Italian or French restaurants
var actions = ['italian', 'french']

var transition = function(state, action) {
  if (action === 'italian') {
    return 'pizza';
  } else {
    return 'steak frites';
  }
}

var utility = function(state) {
  if (state === 'pizza') {
    return 10;
  } else {
    return 0;
  }
}

var maxAgent = function(state) {
  return argMax(
    function(action) {
      return utility(transition(state, action));
    },
    actions);
}

console.log('Choice in initial state: ' + maxAgent('initialState'))