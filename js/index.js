var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


var x = d3.scaleBand().range ([0, width]).padding(0.4);

var y = d3.scaleLinear().range([height, 0]);
//levels: 5,4,3,2,1
var data=[{'skill': 'Java', 'level': 5}, {'skill': 'HTML5', 'level': 4.8},{'skill': 'Python', 'level': 4.5}, 
{'skill': 'PHP', 'level': 4.5}, {'skill': 'Jquery/JS', 'level': 4.5}, {'skill': 'D3Js', 'level': 4.2}, {'skill': 'C++/C', 'level': 3}]

var xAxis = d3.axisBottom(x)
    .scale(x)
    // .orient("bottom")
    // .tickFormat(d3.time.format("%Y-%m"));

var yAxis = d3.axisLeft(y)
    .ticks(5);

var svg = d3.select("#bar_chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function(d) { return d.skill; }));
  y.domain([0, d3.max(data, function(d) { return d.level; })]);
  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d){
        return d.level;
      });
  svg.call(tip);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" )
      .style("font-size", '12px')
      .style("font-weight", 600);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text").style("font-size", '12px')
      .style("font-weight", 600)
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      // .text("Value ($)")
      // .style("font-size", '12px')
      // .style("font-weight", 600);

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.skill); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.level); })
      .attr("height", function(d) { return height - y(d.level); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  var data = [{'tool':'MySQL', 'level':'Advanced', 'val': 5}, {'tool':'SpringMVC', 'level':'Expert', 'val': 4.5}, {'tool':'AWS', 'level':'Expert', 'val': 4}, 
  {'tool':'PostgreSQL', 'level':'Intermediate', 'val': 3.5}, {'tool':'RESTfulAPIs', 'level':'Intermediate', 'val': 3}, {'tool':'Elastic Server', 'level':'Intermediate', 'val': 3}, {'tool':'Symfony', 'level':'Intermediate', 'val': 3}];
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // set the ranges
  var y = d3.scaleBand()
            .range([height, 0])
            .padding(0.1);

  var x = d3.scaleLinear()
            .range([0, width]);
            
  var svg = d3.select("#horizontal-bar-chart").append("svg")
      .attr("width", 650)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", 
            "translate(" + 120 + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain([0, d3.max(data, function(d){ return d.val; })])
    y.domain(data.map(function(d) { return d.tool; }));
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .style("fill", "steelblue")
        //.attr("x", function(d) { return x(d.sales); })
        .attr("width", function(d) {return x(d.val); } )
        .attr("y", function(d) { return y(d.tool); })
        .attr("height", y.bandwidth())
        .on("mouseover", function(d){
          d3.selectAll('.bar').style("opacity", 0.5);
          d3.select(this).style("opacity", 1);
        }).on("mouseout", function(d){
          d3.selectAll('.bar').style("opacity", 1);
        });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .style("font-size", '12px')
        .style("font-weight", 600);

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .style("font-size", '12px')
        .style("font-weight", 600);