var snabbt = require('snabbt.js');

module.exports = swap;

function swap(hideThis, showThis) {
  var fast = 200; // millis

  snabbt(hideThis, {
    opacity: 0,
    duration: fast,
    callback: function() {
      hideThis.classList.add('hidden');
      showThis.classList.remove('hidden');

      snabbt(showThis, {
        duration: fast,
        fromOpacity: 0,
        opacity: 1
      });
    }
  });
}