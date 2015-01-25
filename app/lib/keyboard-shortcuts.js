var counter = require('./counter');
var diceTumble = require('./dice-tumble');

// KeyboardEvent#key -> roll
var rollsByKey = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '0': 10,
  '-': 11,
  '=': 12
};

window.addEventListener('keydown', function(event) {
  // equivalent to clicking a chit
  if (event.key in rollsByKey) {
    counter.increment(rollsByKey[event.key]);
    event.preventDefault();
  }

  // equivalent to rolling dice
  if (event.key == ' ') {
    diceTumble();
  }
});

