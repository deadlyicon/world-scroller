;(function($) {

  var
    WINDOW   = $(window),
    DOCUMENT = $(document),
    VIEWPORT,
    CANVAS,
    MULTIPLIER;

  Number.prototype.times = function(block){
    for (var i=0; i < this; i++) block(i);
  };

  jQuery.fn.topPercentage = function(){
    return this.position().top / this.parent().height() * 100;
  };

  jQuery.fn.leftPercentage = function(){
    return this.position().left / this.parent().width() * 100;
  };

  DOCUMENT.delegate('#menu a', 'click', function(){
    scrollTo($(this).attr('href').replace(/^#/, ''));
  });

  $(document).ready(function(){

    VIEWPORT   = $('#viewport');
    CANVAS     = $('#canvas');
    MULTIPLIER = CANVAS.height() / VIEWPORT.height();

    setInterval(debug, 1000);
  });




  function adjustPosition(position){
    return Number(position) * MULTIPLIER * -1 + '%';
  }

  function drawGrid() {
    var
      size   = 200,
      width  = CANVAS.width(),
      height = CANVAS.height(),
      blocks = [],
      block;

    block = $('<div class="grid-block">').css({
      height: size + 1,
      width : size + 1
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

    $(blocks).appendTo($('#grid'));
  }

  function scrollTo(page){
    page = $('.page.'+page);
    var css = {
      top:  adjustPosition(page.topPercentage()),
      left: adjustPosition(page.leftPercentage())
    };

    // has.css_transitions
      // CANVAS.animate(css,2000);
    // else
      CANVAS.css(css);
  }

  function debug(text){
    var page = $('.page:first');
    $('#debug-data').text(
      'viewport height: '+VIEWPORT.height()  +'\n'+
      'viewport width:  '+VIEWPORT.width()   +'\n'+
      'canvas width:    '+CANVAS.width()     +'\n'+
      'canvas height:   '+CANVAS.height()    +'\n'+
      'page width:      '+page.width()       +'\n'+
      'page height:     '+page.height()      +'\n'+
      'canvas top:      '+CANVAS.css('top')  +'\n'+
      'canvas left:     '+CANVAS.css('left') +'\n'
    );
  }

})(jQuery);

