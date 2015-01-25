var diceTumble = require('./dice-tumble');

var rollButton = document.getElementById('roll-button');
rollButton.addEventListener('click', function(event) {
  event.preventDefault();

  diceTumble();
});