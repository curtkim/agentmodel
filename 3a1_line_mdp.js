var transition = function(state, action) {
  return state + action
}

var utility = function(state) {
  if (state === 3)
    return 1
  else
    return 0
}

var makeAgent = function() {

  var act = function(state, timeLeft) {
    return Infer({ model() {
      var action = uniformDraw([-1, 0, 1])
      var eu = expectedUtility(state, action, timeLeft)
      factor(5 * eu)
      return action
    }})
  }

  var expectedUtility = function(state, action, timeLeft){
    var u = utility(state, action)
    var newTimeLeft = timeLeft - 1
    if (newTimeLeft === 0){
      return u
    } else {
      return u + expectation(Infer({ model() {
        var nextState = transition(state, action)
        var nextAction = sample(act(nextState, newTimeLeft))
        return expectedUtility(nextState, nextAction, newTimeLeft)
      }}))
    }
  }
  return { act }
}

var act = makeAgent().act

var startState = 0
var totalTime = 4

// Agent's move '-1' means 'left', '0' means 'stay', '1' means 'right'
console.log(act(startState, totalTime))
"Agent's action: " + sample(act(startState, totalTime))