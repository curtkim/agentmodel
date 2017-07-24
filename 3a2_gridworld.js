///fold: Restaurant constants, tableToUtilityFunction

var ___ = ' ';
var DN = { name : 'Donut N' };
var DS = { name : 'Donut S' };
var V = { name : 'Veg' };
var N = { name : 'Noodle' };

var tableToUtilityFunction = function(table, feature) {
  return function(state, action) {
    var stateFeatureName = feature(state).name;
    return stateFeatureName ? table[stateFeatureName] : table.timeCost;
  };
};
///

// Construct world

var grid = [
  ['#', '#', '#', '#',  V , '#'],
  ['#', '#', '#', ___, ___, ___],
  ['#', '#', DN , ___, '#', ___],
  ['#', '#', '#', ___, '#', ___],
  ['#', '#', '#', ___, ___, ___],
  ['#', '#', '#', ___, '#',  N ],
  [___, ___, ___, ___, '#', '#'],
  [DS , '#', '#', ___, '#', '#']
];

var mdp = makeGridWorldMDP({
  grid,
  start: [3, 1],
  totalTime: 9
});

var world = mdp.world;
var transition = world.transition;
var stateToActions = world.stateToActions;


// Construct utility function

var utilityTable = {
  'Donut S': 1,
  'Donut N': 1,
  'Veg': 3,
  'Noodle': 2,
  'timeCost': -0.1
};

var utility = tableToUtilityFunction(utilityTable, world.feature);


// Construct agent

var makeAgent = function() {

  var act = dp.cache(function(state) {
    return Infer({ model() {
      var action = uniformDraw(stateToActions(state));
      var eu = expectedUtility(state, action);
      factor(100 * eu);
      return action;
    }});
  });

  var expectedUtility = dp.cache(function(state, action){
    var u = utility(state, action);
    if (state.terminateAfterAction){
      return u;
    } else {
      return u + expectation(Infer({ model() {
        var nextState = transition(state, action);
        var nextAction = sample(act(nextState));
        return expectedUtility(nextState, nextAction);
      }}));
    }
  });

  return { act };
};

var act = makeAgent().act;


// Generate and draw a trajectory

var simulate = function(state) {
  var action = sample(act(state));
  var nextState = transition(state, action);
  var out = [state, action];
  if (state.terminateAfterAction) {
    return [out];
  } else {
    return [out].concat(simulate(nextState));
  }
};

var trajectory = simulate(mdp.startState);
trajectory