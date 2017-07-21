// Remove each element in array ys from array xs
var remove = function(xs, ys) {
  return _.without.apply(null, [xs].concat(ys))
}

var doors = [1, 2, 3]

// Monty chooses a door that is neither Alice's door
// nor the prize door
var monty = function(aliceDoor, prizeDoor) {
  return Infer({
    model() {
      var door = uniformDraw(doors)
      // ???
      return door
    }})
}


var actions = ['switch', 'stay']

// If Alice switches, she randomly chooses a door that is
// neither the one Monty showed nor her previous door
var transition = function(state, action) {
  if (action === 'switch') {
    return {
      prizeDoor: state.prizeDoor,
      montyDoor: state.montyDoor,
      aliceDoor: // ???
    }
  } else {
    return state
  }
}

// Utility is high (say 10) if Alice's door matches the
// prize door, 0 otherwise.
var utility = function(state) {
  // ???
}

var sampleState = function() {
  var aliceDoor = uniformDraw(doors)
  var prizeDoor = uniformDraw(doors)
  return {
    aliceDoor,
    prizeDoor,
    montyDoor: sample(monty(aliceDoor, prizeDoor))
  }
}

var agent = function() {
  var action = uniformDraw(actions)
  var expectedUtility = function(action){
    return expectation(Infer({
      model() {
        var state = sampleState()
        return utility(transition(state, action))
      }}))
  };
  factor(expectedUtility(action))
  return { action }
};

Infer({ model: agent })