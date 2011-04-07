;(function($) {

  var
    WINDOW   = $(window),
    DOCUMENT = $(document),
    VIEWPORT, CANVAS, GRID, PAGES;

  Number.prototype.times = function(block){
    for (var i=0; i < this; i++) block(i);
  };

  function debug(text){
    $('#debug-data').html(text);
  }

  DOCUMENT.delegate('#menu a', 'click', function(){
    var link = $(this);
    CANVAS.animate({
      top: link.data('top'),
      left: link.data('left')
    },{
      duration: 3000
    });
  });
  
  function resizePages(animate){
    console.log('resizePages', animate);
    var css ={
      height : VIEWPORT.height() - 10,
      width  : VIEWPORT.width() - 10
    };
    animate ? PAGES.animate(css) : PAGES.css(css);
  }

  $(document).ready(function(){

    VIEWPORT = $('#viewport');
    CANVAS = $('#canvas');
    GRID = $('#grid');
    PAGES = $('#canvas .page');

    resizePages();
    var resize_pages_timeout;
    WINDOW.resize(function(){
      clearTimeout(resize_pages_timeout);
      resize_pages_timeout = setTimeout(resizePages, 200);
    });

    ;(function() {
      var
        size   = 200,
        width  = CANVAS.width(),
        height = CANVAS.height(),
        blocks = [],
        block;

      block = $('<div class="grid-block">').css({
        height: size + 1,
        width : size + 1,
      });

      (height / size).times(function(h){
        (width / size).times(function(w){
          var top = h * size, left = w * size, clone;
          clone = block.clone();
          clone.css({top:top,left:left});
          clone.text(top+'x'+left);
          blocks.push(clone[0]);
        });
      });

      $(blocks).appendTo(GRID);

    })();

    setInterval(function(){
      debug(
        'viewport height: '+VIEWPORT.height()  +'\n'+
        'viewport width:  '+VIEWPORT.width()   +'\n'+
        'canvas width:    '+CANVAS.width()     +'\n'+
        'canvas height:   '+CANVAS.height()    +'\n'+
        'canvas top:      '+CANVAS.css('top')  +'\n'+
        'canvas left:     '+CANVAS.css('left') +'\n'
      )
    }, 1000);

  });




})(jQuery);