// Set up agent structure

var makeMDPAgent = function(params, world) {
  var stateToActions = world.stateToActions;
  var transition = world.transition;
  var utility = params.utility;
  var alpha = params.alpha;

  var act = dp.cache(
    function(state) {
      return Infer({ model() {
        var action = uniformDraw(stateToActions(state));
        var eu = expectedUtility(state, action);
        factor(alpha * eu);
        return action;
      }});
    });

  var expectedUtility = dp.cache(
    function(state, action){
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

  return { params, expectedUtility, act };
};

var simulate = function(startState, world, agent) {
  var act = agent.act;
  var transition = world.transition;
  var sampleSequence = function(state) {
    var action = sample(act(state));
    var nextState = transition(state, action);
    if (state.terminateAfterAction) {
      return [state];
    } else {
      return [state].concat(sampleSequence(nextState));
    }
  };
  return sampleSequence(startState);
};


// Set up world

var makeHikeMDP = function(options) {
  var H = { name: 'Hill' };
  var W = { name: 'West' };
  var E = { name: 'East' };
  var ___ = ' ';
  var grid = [
    [___, ___, ___, ___, ___],
    [___, '#', ___, ___, ___],
    [___, '#',  W , '#',  E ],
    [___, ___, ___, ___, ___],
    [ H ,  H ,  H ,  H ,  H ]
  ];
  return makeGridWorldMDP(_.assign({ grid }, options));
};

var mdp = makeHikeMDP({
  start: [0, 1],
  totalTime: 12,
  transitionNoiseProbability: 0
});

var makeUtilityFunction = mdp.makeUtilityFunction;


// Create parameterized agent

var utility = makeUtilityFunction({
  East: 10,
  West: 1,
  Hill: -10,
  timeCost: -.1
});
var agent = makeMDPAgent({ utility, alpha: 1000 }, mdp.world);


// Run agent on world

var trajectory = simulate(mdp.startState, mdp.world, agent);


viz.gridworld(mdp.world, { trajectory });