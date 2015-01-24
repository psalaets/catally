var counts = require('./counts');
var forEach = Array.prototype.forEach;

var chits = document.querySelectorAll('.chit');

forEach.call(chits, function(chit) {
  chit.addEventListener('click', function() {
    counts.increment(parseInt(chit.dataset.number, 10));
  });
});