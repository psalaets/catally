var buttons = document.querySelectorAll('#bottom-bar button');
var forEach = Array.prototype.forEach;

forEach.call(buttons, function(button) {
  button.addEventListener('click', function() {
    var showId = button.dataset.show;
    var hideId = button.dataset.hide;

    document.getElementById(showId).classList.remove('hidden');
    document.getElementById(hideId).classList.add('hidden');
  });
});