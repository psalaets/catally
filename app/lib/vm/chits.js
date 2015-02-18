var wobble = require('../wobble');
var counter = require('../counter');
var forEach = Array.prototype.forEach;

module.exports = {
  press: press,
  bind: bind
};

// selects chit elements
var chitSelector;

function getChitSelector() {
  if (chitSelector) return chitSelector;
  throw new Error('chits are not bound, call chits.bind(<selector>)');
}

function bind(selector) {
  chitSelector = selector;
  var chitElements = document.querySelectorAll(getChitSelector());

  if (chitElements.length == 0) {
    throw new Error('No elements selected by ' + getChitSelector());
  }

  forEach.call(chitElements, function(chitElement) {
    chitElement.addEventListener('click', chitClicked);
  });
}

// assumes "this" is an element
function chitClicked() {
  var number = parseInt(this.dataset.number, 10);
  press(number);
}

function press(number) {
  counter.increment(number);
  wobbleChitsByNumber(number);
}

function wobbleChitsByNumber(number) {
  var chitElements = document.querySelectorAll(getChitSelector() + "[data-number='" + number +"']");

  // wobble all chits returned because there are hidden ones
  // and we don't bother to check which is which
  Array.prototype.forEach.call(chitElements, function(chitElement) {
    wobble(chitElement);
  });
}