var data = {};

for (var i = 2; i < 13; i++) {
  data[i] = 0;
}

var counts = {
  increment: function(number) {
    data[number] += 1;
  },
  clear: function() {
    for (var key in data) {
      data[key] = 0;
    }
  }
};

Object.defineProperty(counts, 'all', {
  get: function() {
    var copy = {};

    for (var key in data) {
      copy[key] = data[key];
    }

    return copy;
  }
});

Object.defineProperty(counts, 'total', {
  get: function() {
    var total = 0;

    for (var key in data) {
      total += data[key];
    }

    return total;
  }
});

module.exports = counts;