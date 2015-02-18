var swap = require('./swap-chits-and-dice');

module.exports = bindToggleButtons;

function bindToggleButtons(selector) {
  var toggleButtons = document.querySelectorAll(selector);
  toggleButtons = Array.prototype.slice.call(toggleButtons);

  toggleButtons.forEach(function(button) {
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
}

function unpressAll(buttons) {
  buttons.forEach(function(button) {
    button.classList.remove('pressed');
  });
}