var snabbt = require('snabbt.js');

module.exports = swap;

function swap(hideThis, showThis) {
  hideThis.classList.add('hidden');
  showThis.classList.remove('hidden');
}