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

  // Hide Details
  $("#country-details").hide()

  
  // Resize Map
  resizeMap();

  // Draw Map
  worldMap.vectorMap({
    map: 'world_mill_en',
    backgroundColor: '#3498db',
    zoomOnScroll: false,
    regionsSelectable: true,
    series: {
      regions: [{
        values: visitedData,
        scale: ['#ecf0f1', '#18bc9c'],
        normalizeFunction: 'polynomial'
      }]
    },
    regionStyle: {
      selected: {
        fill: '#f39c12'
      }
    },
    onRegionLabelShow: function(e, el){
      el.html(el.html());
    },
    onRegionClick: function(event, code){
      var map = worldMap.vectorMap('get', 'mapObject');
      map.clearSelectedRegions();
      showCountryInfo(code)
      map.setFocus(code);
      // console.log(code);
    }
  });



  // RESET BUTTON
  //----------------------------
  $('a.reset').click(function(){
    var map = worldMap.vectorMap('get', 'mapObject');
    map.clearSelectedRegions();
    map.setFocus(1,0,0);
    $("#country-details").hide()
  });


  // PERCENTAGES
  //----------------------------
  var total=0;
  var visited = 0;
  for (var x in visitedData){
    if(visitedData.hasOwnProperty(x)){
      total++;
      if (visitedData[x] == 1){
        visited++;
      }
    }
  }
  var percentage = (visited / total) * 100;
  var roundedPercenttage = Math.round(percentage);
  var whatsLeft = 100 - roundedPercenttage;
  console.log("Total: " + total + " Visited: " + visited + " Percentage: " + roundedPercenttage + "% Left: " + whatsLeft + "%.");

  $("em.percentage").html(roundedPercenttage + "%");
  $("em.visited").html(visited);
  $("em.total").html(total);


  // CHART JS 
  // ---------------------------------
  var data = [
    {
      value: roundedPercenttage,
      color:"#e74c3c"
    },
    {
      value : whatsLeft,
      color : "#ecf0f1"
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


  // REST API Function
  function showCountryInfo(code) {
    var jsonURL = "http://restcountries.eu/rest/alpha/" + code; 
    $.getJSON( jsonURL, function( data ) {
      $("#country-name").html(data.name);
      $("#capital-city").html(data.capital);
      $("#population").html(numberWithCommas(data.population));
      $("#currency").html(data.currency);
      $("#time-zone").html(data.timezones);
      $("#country-details").show()        
    });
  }


  //  Number With Commas
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
  }  
}); //eo:doc ready

// Window Resize
$(window).resize(function() {
  resizeMap();
});