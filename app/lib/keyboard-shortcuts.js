var counter = require('./counter');
var diceTumble = require('./dice-tumble');
var wobble = require('./wobble');

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

    counter.increment(rollsByKeyCode[event.keyCode]);
    wobbleChitByNumber(rollsByKeyCode[event.keyCode]);
  }

  // equivalent to rolling dice
  if (event.keyCode == 32) { // spacebar
    diceTumble();
  }
});

function wobbleChitByNumber(number) {
  var chits = document.querySelectorAll(".chit[data-number='" + number +"']");

  // wobble all chits returned because there are hidden ones and we don't bother to check
  Array.prototype.forEach.call(chits, function(chit) {
    wobble(chit);
  });
}