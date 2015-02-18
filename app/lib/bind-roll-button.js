var dice = require('./vm/dice');

var rollButton = document.getElementById('roll-button');
rollButton.addEventListener('click', function(event) {
  event.preventDefault();

  dice.roll();
});