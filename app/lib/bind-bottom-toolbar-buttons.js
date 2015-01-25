var buttons = document.querySelectorAll('#bottom-bar button');
var forEach = Array.prototype.forEach;

forEach.call(buttons, function(button) {
  button.addEventListener('click', function() {
    var showId = button.dataset.show;
    var hideId = button.dataset.hide;

    // show chits or dice
    document.getElementById(showId).classList.remove('hidden');
    document.getElementById(hideId).classList.add('hidden');

    // make button look pressed
    unpressAll(buttons);
    button.classList.add('pressed');
  });
});

function unpressAll(buttons) {
  forEach.call(buttons, function(button) {
    button.classList.remove('pressed');
  });
}