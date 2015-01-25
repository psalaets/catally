module.exports = roll;

function roll() {
  var die1 = rollDie();
  var die2 = rollDie();

  return {
    parts: [die1, die2],
    roll: die1 + die2
  };
}

function rollDie() {
  var min = 1; // inclusive
  var max = 7; // exclusive

  return Math.floor(Math.random() * (max - min)) + min;
}