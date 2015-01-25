var snabbt = require('snabbt.js');

var counter = require('./counter');
var forEach = Array.prototype.forEach;

var chits = document.querySelectorAll('.chit');

forEach.call(chits, function(chit) {
  chit.addEventListener('click', function() {
    var number = parseInt(chit.dataset.number, 10);
    counter.increment(number);

    wobble(chit);
  });
});

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