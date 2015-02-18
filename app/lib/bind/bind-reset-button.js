var counter = require('../counter');

module.exports = bindResetButton;

function bindResetButton(id) {
  var resetButton = document.getElementById(id);

  resetButton.addEventListener('click', function() {
    counter.clear();
  });
}