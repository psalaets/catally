var counter = require('./counter');
var wobble = require('./wobble');

var chits = require('./vm/chits');
var dice = require('./vm/dice');

// KeyboardEvent#keyCode -> roll
var rollsByKeyCode = {
  '50': 2,   // 2 key
  '51': 3,   // ...
  '52': 4,
  '53': 5,
  '54': 6,
  '55': 7,
  '56': 8,
  '57': 9,   // 9 key
  '48': 10,  // 0 key
  '173': 11, // minus in FF
  '61': 12,  // equals in FF
  '189': 11, // minus in chrome/safari
  '187': 12  // equals in chrome/safari
};

window.addEventListener('keydown', function(event) {
  /*
  console.log('keydown, event.key: ' + event.key);
  console.log('keydown, event.which: ' + event.which);
  console.log('keydown, event.keyCode: ' + event.keyCode);
  */

  // equivalent to clicking a chit
  if (event.keyCode in rollsByKeyCode) {
    event.preventDefault();

    chits.press(rollsByKeyCode[event.keyCode]);
  }

  // equivalent to rolling dice
  if (event.keyCode == 32) { // spacebar
    event.preventDefault();

    dice.roll();
  }
});