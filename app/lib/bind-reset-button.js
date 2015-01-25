var counter = require('./counter');
var resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', function() {
  counter.clear();
});
