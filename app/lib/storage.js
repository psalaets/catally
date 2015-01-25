var localforage = require('localforage');

var key = 'diceRolls';

var storage = {
  getCounts: function() {
    return localforage.getItem(key).then(function(counts) {
      if (!counts) {
        return localforage.setItem(key, initialCounts());
      } else {
        return counts;
      }
    });
  },
  setCount: function(number, count) {
    return this.getCounts().then(function(counts) {
      counts[number] = count;
      return localforage.setItem(key, counts);
    });
  },
  reset: function() {
    return localforage.setItem(key, initialCounts());
  }
};

function initialCounts() {
  var counts = {};
  for (var i = 2; i < 13; i++) {
    counts[i] = 0;
  }

  return counts;
}

module.exports = storage;