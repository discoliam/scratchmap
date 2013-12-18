// Application JS

// VARS
// ---------------------------------
var worldMap = $('#world-map');
var windowWidth = $(window).width();
var windowHeight = $(window).height();

var visitedData = {};
var numberOfVisits = 0;

var percentage = 0;
var roundedPercenttage = 0;
var whatsLeft = 0;


// FUNCTIONS
// ---------------------------------

// Resize Map Function
function resizeMap() {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  // worldMap.width(windowWidth - 20 );
  worldMap.height(windowHeight - 300 );
}

  //  Number With Commas
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
  } 


// Document Ready
// ---------------------------------
$( document ).ready(function() {

  // Hide Details
  $("#country-details").hide()

  // Initiate Parse
  Parse.initialize("y5jeD3z7l6HGvTK8z9yVheML3ymj7wKg3dcsJ2Ij", "E430ZYruAuiGPHH91j9s1RdNL6IjLIq74gjt6bM4");
 
  // Start Everything
  getVisited();

  // Resize Map
  resizeMap();


  // Clicks
  //----------------------------

  // Visited Button
  $("#set-visited").click(function(e){
    setVisited($(this).attr("data-region"));
    e.preventDefault();
  })

  // Reset Button
  $('a.reset').click(function(){
    var map = worldMap.vectorMap('get', 'mapObject');
    map.clearSelectedRegions();
    map.setFocus(1,0,0);
    $("#country-details").hide()
  });



  // Functions
  //----------------------------
  // Draw Map
  function worldDraw(visitedData) {
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
  } //eo:worldDraw
  
  // Set Visited Country
  function setVisited(code) {
    var RegionObject = Parse.Object.extend("Region");
    var regionObject = new RegionObject();
      regionObject.save({region_code: code, visited: "1"}, {
      success: function(object) {
        location.reload();
      },
      error: function(model, error) {
        $(".error").show();
      }
    });
  }//eo:setVisited

  //Get Visited Countires
  function getVisited() {
    var regionQuery = new Parse.Query("Region");
    regionQuery.find().then(function(results){
      // console.log(results[0].get("region_code") + ":" +  results[0].get("visited"));
      for(var i=0;i < results.length; i++) {
         visitedData[results[i].get("region_code")] = results[i].get('visited');
      }
      numberOfVisits = results.length;
      //console.log(numberOfVisits)
      // console.log(JSON.stringify(visitedData));
    }).then(function(){
      worldDraw(visitedData);
      percentageVisited();
      showChart();
    }, function(error){
      console.log(error.message);
    })
  }//eo:getVisited

  // Calculate Percentages
  function percentageVisited() {
    var total=198;
    percentage = (numberOfVisits / total) * 100;
    roundedPercenttage = Math.round(percentage);
    whatsLeft = 100 - roundedPercenttage;
    // console.log("Total: " + total + " Visited: " + visitedData + " Percentage: " + roundedPercenttage + "% Left: " + whatsLeft + "%.");
    $("em.percentage").html(roundedPercenttage + "%");
    $("em.visited").html(numberOfVisits);
    $("em.total").html(total);
  } //percentageVisited

  // Chart JS 
  function showChart(){
    var chartData = [
      {
        value: roundedPercenttage,
        color:"#e74c3c"
      },
      {
        value : whatsLeft,
        color : "#ecf0f1"
      }
    ];
    var chartSettings = {
      segmentShowStroke : false,
      animateScale : true,
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx).Pie(chartData,chartSettings);
  } //eo:showChart

  
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
      $("#set-visited").attr("data-region", code)        
    });
  }

}); //eo:doc ready


// Window Resize
// ---------------------------------
$(window).resize(function() {
  resizeMap();
});