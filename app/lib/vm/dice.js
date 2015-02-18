var counter = require('../counter');
var roll = require('../dice-roll');

module.exports = {
  bind: bind,
  roll: diceTumble
};

var rollResultElement;

function bind(id) {
  rollResultElement = document.getElementById(id);
}

function diceTumble() {
  tumble(roll(), 1);
  tumble(roll(), 50);
  tumble(roll(), 100);
  tumble(roll(), 150);
  endUpOn(roll(), 200);
}

function endUpOn(result, delay) {
  setTimeout(function() {
    rollResultElement.textContent = result.roll;
    counter.increment(result.roll);
  }, delay);
}

function tumble(result, delay) {
  setTimeout(function() {
    rollResultElement.textContent = result.roll;
  }, delay);
}