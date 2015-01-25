var snabbt = require('snabbt.js');

module.exports = wobble;

function wobble(element) {
  var amount = Math.PI / 3;

  snabbt(element, {
    rotation: [0, amount, 0],
    duration: 50,
    easing: 'ease'
  }).then({
    rotationFrom: [0, amount, 0],
    easing: 'spring',
    springConstant: 1,
    springDeacceleration: 0.9,
  });
}