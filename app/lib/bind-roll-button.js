var counter = require('./counter');
var roll = require('./dice');

var rollResult = document.getElementById('roll-result');

var rollButton = document.getElementById('roll-button');
rollButton.addEventListener('click', diceTumble);

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