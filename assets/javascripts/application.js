$( document ).ready(function() {
    
    // VARS
    var worldMap = $('#world-map');
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    // Resize Map Function
    function resizeMap() {
      worldMap.width(windowWidth - 20 );
      worldMap.height(windowHeight - 20 );
    }

    resizeMap();

    // Draw Map
    $(function(){
      $('#world-map').vectorMap();
    }); 

});

$(window).resize(function() {
  resizeMap();
});