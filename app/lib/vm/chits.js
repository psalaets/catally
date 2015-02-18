var wobble = require('../effects/wobble');
var counter = require('../counter');
var forEach = Array.prototype.forEach;

module.exports = {
  press: press,
  bind: bind
};

// Array of chit elements
var chitElements;

function bind(selector) {
  if (chitElements) {
    throw new Error('chits are already bound');
  }

  chitElements = document.querySelectorAll(selector);
  // convert to array for ease of use
  chitElements = Array.prototype.slice.call(chitElements);

  if (chitElements.length == 0) {
    throw new Error('No elements selected by ' + selector);
  }

  chitElements.forEach(function(chitElement) {
    chitElement.addEventListener('click', chitClicked);
  });
}

// assumes "this" is an element
function chitClicked() {
  press(chitNumberOf(this));
}

function chitNumberOf(chitElement) {
  return parseInt(chitElement.dataset.number, 10);
}

function press(number) {
  counter.increment(number);
  wobbleChitsByNumber(number);
}

function wobbleChitsByNumber(number) {
  // wobble all chits with the number because there are hidden ones
  // and we don't bother to check which is which
  chitElements.forEach(function(chitElement) {
    if (chitNumberOf(chitElement) == number) {
      wobble(chitElement);
    }
  });
}