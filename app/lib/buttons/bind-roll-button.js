var dice = require('../vm/dice');

module.exports = bindRollButton;

function bindRollButton(id) {
  var rollButton = document.getElementById(id);
  rollButton.addEventListener('click', function(event) {
    event.preventDefault();

    dice.roll();
  });
}