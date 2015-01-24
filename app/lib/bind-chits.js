var counter = require('./counter');
var forEach = Array.prototype.forEach;

var chits = document.querySelectorAll('.chit');

forEach.call(chits, function(chit) {
  chit.addEventListener('click', function() {
    var number = parseInt(chit.dataset.number, 10);
    counter.increment(number);
  });
});