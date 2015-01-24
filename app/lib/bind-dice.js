var counter = require('./counter');
var roll = require('./dice');

var rollResult = document.getElementById('roll-result');

var rollButton = document.getElementById('roller');
rollButton.addEventListener('click', function() {
  var result = roll();

  rollResult.textContent = result.roll;

  counter.increment(result.roll);
});

