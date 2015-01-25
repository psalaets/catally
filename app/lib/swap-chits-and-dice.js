var snabbt = require('snabbt.js');

module.exports = swap;

function swap(hideThis, showThis) {
  // millis
  var instant = 1;
  var fast = 200;

  snabbt(showThis, {
    // rotate showThis one by 1/4 to get it ready
    rotation: [0, Math.PI / 2, 0],
    duration: instant,
    callback: function() {
      // show showThis
      showThis.classList.remove('hidden');

      // rotate hideThis by 1/4
      snabbt(hideThis, {
        rotation: [0, Math.PI / 2, 0],
        easing: 'ease',
        duration: fast,
        callback: function() {
          // hide hideThis
          hideThis.classList.add('hidden');

          // rotate showThis back 1/4
          snabbt(showThis, {
            rotationFrom: [0, Math.PI / 2, 0],
            easing: 'ease',
            duration: fast
          });
        }
      }).then(hideThis, {
        // rotate hideThis back 1/4 so it's ready for next time
        rotationFrom: [0, Math.PI / 2, 0],
        duration: instant
      });
    }
  });
}