var snabbt = require('snabbt.js');

module.exports = swap;

function swap(hideThis, showThis) {
  showThis.classList.remove('hidden');
  hideThis.classList.add('hidden');
}