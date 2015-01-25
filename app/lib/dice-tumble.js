var counter = require('./counter');
var roll = require('./dice-roll');

module.exports = diceTumble;

var rollResult = document.getElementById('roll-result');

function diceTumble() {
  tumble(roll(), 1);
  tumble(roll(), 50);
  tumble(roll(), 100);
  tumble(roll(), 150);
  endUpOn(roll(), 200);
}

function endUpOn(result, delay) {
  setTimeout(function() {
    rollResult.textContent = result.roll;
    counter.increment(result.roll);
  }, delay);
}

function tumble(result, delay) {
  setTimeout(function() {
    rollResult.textContent = result.roll;
  }, delay);
}