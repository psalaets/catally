require('./lib/bind-chits');

var d3 = require('d3');

// based off of http://bl.ocks.org/mbostock/3887051

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var data = [
  { number: 2, expected: 3, actual: 2 },
  { number: 3, expected: 6, actual: 5 },
  { number: 4, expected: 8, actual: 9 },
  { number: 5, expected: 11, actual: 9 },
  { number: 6, expected: 14, actual: 15 },
  { number: 7, expected: 17, actual: 18 },
  { number: 8, expected: 14, actual: 16 },
  { number: 9, expected: 11, actual: 10 },
  { number: 10, expected: 8, actual: 9 },
  { number: 11, expected: 6, actual: 3 },
  { number: 12, expected: 3, actual: 1 }
]

var x0 = d3.scale.ordinal()
    .domain(data.map(function(d) {
      return d.number;
    }))
    .rangeBands([0, width], 0.1);

// Series scale, x axis
// It might help to think of the series scale as a child of the groups scale

var percentNames = Object.keys(data[0]).filter(function(k) { return k !== 'number' })

data.forEach(function(d) {
  d.percents = percentNames.map(function(name) {
    return {
      name: name,
      value: d[name]
    }
  })
})

var x1 = d3.scale.ordinal()
    .domain(percentNames)
    .rangeRoundBands([0, x0.rangeBand()]);

// Values scale, y axis
var y = d3.scale.linear()
    .domain([0, d3.max(data, function(d) {
      return d3.max(d.percents, function(percent) {
        return percent.value;
      })
    })])
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["red", "yellow"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


var state = svg.selectAll(".state")
    .data(data)
  .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) { return "translate(" + x0(d.number) + ",0)"; });

state.selectAll("rect")
    .data(function(d) { return d.percents; })
  .enter().append("rect")
    .attr("width", x1.rangeBand())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); })
    .style("fill", function(d) { return color(d.name); });

var legend = svg.selectAll(".legend")
    .data(percentNames.slice().reverse())
  .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
