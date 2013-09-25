// Application JS

// VARS
var worldMap = $('#world-map');
var windowWidth = $(window).width();
var windowHeight = $(window).height();

// Resize Map Function
function resizeMap() {
  windowWidth = $(window).width();
  windowHeight = $(window).height();
  worldMap.width(windowWidth - 20 );
  worldMap.height(windowHeight - 100 );
}


// Document Ready
$( document ).ready(function() {
  
  // Resize Map
  resizeMap();

  // Draw Map
  worldMap.vectorMap({
    map: 'world_mill_en',
    series: {
      regions: [{
        values: gdpData,
        scale: ['#C8EEFF', '#0071A4'],
        normalizeFunction: 'polynomial'
      }]
    }
  });

});

// Window Resize
$(window).resize(function() {
  resizeMap();
});