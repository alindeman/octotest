$(function() {
  var $langFreq = $("#lang_freq");
  if ($langFreq.length > 0) {
    var languages = $langFreq.data("languages");

    var barWidth = 40;
    var width = (barWidth + 10) * languages.length;
    var height = 300;

    var x = d3.scale.linear().domain([0, languages.length]).range([0, width]);
    var y = d3.scale.linear().domain([0, d3.max(languages, function(language) { return language.count; })]).
      rangeRound([0, height]);

    // add the canvas to the DOM
    var languageBars = d3.select("#lang_freq").
      append("svg:svg").
      attr("width", width).
      attr("height", height);

    languageBars.selectAll("rect").
      data(languages).
      enter().
      append("svg:rect").
      attr("x", function(language, index) { return x(index); }).
      attr("y", function(language) { return height - y(language.count); }).
      attr("height", function(language) { return y(language.count); }).
      attr("width", barWidth);

    languageBars.selectAll("text").
      data(languages).
      enter().
      append("svg:text").
      attr("x", function(language, index) { return x(index) + barWidth; }).
      attr("y", function(language) { return height - y(language.count); }).
      attr("dx", -barWidth/2).
      attr("dy", "1.2em").
      attr("text-anchor", "middle").
      text(function(language) { return Math.round(language.count / 1024) + "K"; });

    languageBars.selectAll("text.yAxis").
      data(languages).
      enter().append("svg:text").
      attr("x", function(language, index) { return x(index) + barWidth; }).
      attr("y", height).
      attr("dx", -barWidth/2).
      attr("text-anchor", "middle").
      text(function(language) { return language.name; }).
      attr("transform", "translate(0, 18)").
      attr("class", "yAxis")
  }
});
