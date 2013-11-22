// Application JS

// VARS
var worldMap = $('#world-map');
var windowWidth = $(window).width();
var windowHeight = $(window).height();

// Resize Map Function
function resizeMap() {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  // worldMap.width(windowWidth - 20 );
  worldMap.height(windowHeight - 300 );
}


// Document Ready
$( document ).ready(function() {
  
  // Resize Map
  resizeMap();

  // Draw Map
  worldMap.vectorMap({
    map: 'world_mill_en',
    backgroundColor: '#3498DB',
    zoomOnScroll: false,
    regionsSelectable: true,
    series: {
      regions: [{
        values: visitedData,
        scale: ['#ECF0F1', '#27AE60'],
        normalizeFunction: 'polynomial'
      }]
    },
    onRegionLabelShow: function(e, el){
      el.html(el.html());
    },
    onRegionClick: function(event, code){
      var map = worldMap.vectorMap('get', 'mapObject');
      map.clearSelectedRegions();
      $('#fun').find("h1").text(map.getRegionName(code));
      $('#fun').trigger('openModal');
      map.setFocus(code);
      // console.log(code);
    }
  });


  $('a.reset').click(function(){
    var map = worldMap.vectorMap('get', 'mapObject');
    map.clearSelectedRegions();
    map.setFocus(1,0,0);
  });


  $('#fun').easyModal({
    overlay : 0.4,
    overlayClose: false
  });


  $('#modal-test').click(function(e){
    $('#fun').trigger('openModal');
    e.preventDefault();
  });

  $('#close').click(function(e){
    $('#fun').trigger('closeModal');
    e.preventDefault();
  });


// PERCENTAGES
//----------------------------
var i=0;
var visited = 0;
for (var x in visitedData){
  if(visitedData.hasOwnProperty(x)){
    i++;
    if (visitedData[x] == 1){
      visited++;
    }
  }
}
var percentage = (visited / i) * 100;
var roundedPercenttage = Math.round(percentage);
var whatsLeft = 100 - roundedPercenttage;
console.log("Total: " + i + " Visited: " + visited + " Percentage: " + roundedPercenttage + "% Left: " + whatsLeft + "%.");

$(".percentage").find("i").html(roundedPercenttage + "%");


// CHART JS 
// ---------------------------------
var data = [
  {
    value: roundedPercenttage,
    color:"#E74C3C"
  },
  {
    value : whatsLeft,
    color : "#ECF0F1"
  }
];

var settings = {
  segmentShowStroke : false,
  animateScale : true,
};

function showChart(){
  var ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx).Pie(data,settings);
};

showChart();



}); //eo:doc ready

// Window Resize
$(window).resize(function() {
  resizeMap();
});