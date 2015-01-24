require('./lib/bind-chits');

var d3 = require('d3');

// based off of http://bl.ocks.org/mbostock/3885304

var data = [
  { number: 2, actual: 2 },
  { number: 3, actual: 5 },
  { number: 4, actual: 9 },
  { number: 5, actual: 9 },
  { number: 6, actual: 15 },
  { number: 7, actual: 18 },
  { number: 8, actual: 16 },
  { number: 9, actual: 10 },
  { number: 10, actual: 9 },
  { number: 11, actual: 3 },
  { number: 12, actual: 1 }
]

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.number; }));
      y.domain([0, d3.max(data, function(d) { return d.actual; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.number); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.actual); })
          .attr("height", function(d) { return height - y(d.actual); });
