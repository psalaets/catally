var swap = require('./swap-chits-and-dice');

module.exports = bindToggleButtons;

function bindToggleButtons(selector) {
  var toggleButtons = document.querySelectorAll(selector);
  var forEach = Array.prototype.forEach;

  forEach.call(toggleButtons, function(button) {
    button.addEventListener('click', function() {
      var showId = button.dataset.show;
      var hideId = button.dataset.hide;

      if (!button.classList.contains('pressed')) {
        // show chits or dice
        var showThis = document.getElementById(showId);
        var hideThis = document.getElementById(hideId);

        swap(hideThis, showThis);

        // make button look pressed
        unpressAll(toggleButtons);
        button.classList.add('pressed');
      }
    });
  });

  function unpressAll(buttons) {
    forEach.call(buttons, function(button) {
      button.classList.remove('pressed');
    });
  }
}