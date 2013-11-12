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
      // alert(map.getRegionName(code));
      $('#fun').find("h1").text(map.getRegionName(code));
      $('#fun').trigger('openModal');
    }
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


});

// Window Resize
$(window).resize(function() {
  resizeMap();
});