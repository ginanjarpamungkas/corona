// source https://bl.ocks.org/piwodlaiwo/90777c94b0cd9b6543d9dfb8b5aefeef
var width = document.body.getBoundingClientRect().width
var height = window.innerHeight
var active = d3.select(null);
var projection = d3.geoMercator().scale(150).translate([width / 2, height / 2]);  
var zoom = d3.zoom().on("zoom", zoomed);
var path = d3.geoPath().projection(projection);
var data = [{label: "◄", x: width-(width-50), y: height / 2 },
    {label: "►", x: width-50 , y: height / 2 }];
var dataC =[]
var dataR =[]
var svg = d3.select("#map-container").append("svg").attr("width", width).attr("height", height).on("click", stopped, true);
    svg.append("rect").attr("class", "background").attr("width", width).attr("height", height).on("click", reset);

var dataCountry = [];

var g = svg.append("g");
var g_corona = svg.append("g").attr("class", "region")  
svg.call(zoom);
var pathCorona = d3.geoPath().projection(projection);
//this to world countries
d3.json("countryoriginal.json", function(error, world) {
  if (error) throw error;

  g.selectAll("path").data(topojson.feature(world, world.objects.countries).features).enter().append("path").attr("d", path).attr("class", "feature").attr("id", function(d){ for (let ind = 0; ind < 241; ind++) {      
    return d.id
  };}).call(function(d){ for (let ind = 0; ind < 241; ind++) {      
    dataC.push(d._groups[0][ind].__data__)
  };}).attr('name','country');
  g.append("path").datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; })).attr("class", "mesh").attr("d", path);
  console.log(dataC);
});

// this to region country
d3.json("geo-corona.json",function(json) {corona = g_corona.selectAll("path").data(json.features).enter().append("path").attr("d", path).attr("class", "mesh").attr("stroke-width", 0.1).attr('id',function(d){ return d.properties['id']; }).call(function(d){ for (let ind = 0; ind < 80; ind++) {      
  dataR.push(d._groups[0][ind].__data__)
};}).attr('name','region')
console.log(dataR);
})

function reset() {
  console.log('reset');
}

function zoomed() {
  t = d3.event.transform;
  g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
  g.attr("transform", d3.event.transform);
  g_corona.attr("transform","translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
}

function stopped() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
}