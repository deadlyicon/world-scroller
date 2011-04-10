;(function($) {

  var
    WINDOW   = $(window),
    DOCUMENT = $(document),
    VIEWPORT, CANVAS, GRID, PAGES;

  Number.prototype.times = function(block){
    for (var i=0; i < this; i++) block(i);
  };

  jQuery.fn.topPercentage = function(){
    return this.position().top / this.parent().height() * 100;
  }
  jQuery.fn.leftPercentage = function(){
    return this.position().left / this.parent().width() * 100;
  }

  function debug(text){
    $('#debug-data').html(text);
  }

  function adjustPosition(position){
    return Number(position) * 5 * -1 + '%';
    // return Number(position.match(/^(\d+)%$/)[1]) * 10 * -1 +'%';
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
  }

  function scrollTo(page){
    var
      page = $('.page.'+page),
      css = {
        top:  adjustPosition(page.topPercentage()),
        left: adjustPosition(page.leftPercentage())
      };

    CANVAS.css(css);
    // CANVAS.animate(css,2000);
  }

  DOCUMENT.delegate('#menu a', 'click', function(){
    scrollTo($(this).attr('href').replace(/^#/, ''))
  });

  function resizePages(animate){
    // console.log('resizePages', animate);
    // var css ={
    //   'height': VIEWPORT.height() - 10,
    //   'width' : VIEWPORT.width() - 10,
    //   //'background-image': "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, "+(VIEWPORT.width() / 2)+", from(rgb(0, 0, 0)), color-stop(1%, rgb(0, 0, 0)), color-stop(50%, rgb(255, 0, 0)), to(rgb(255, 255, 255)))"
    // };
    // animate ? PAGES.animate(css) : PAGES.css(css);
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
      resize_pages_timeout = setTimeout(function(){ resizePages(true); }, 200);
    });



    setInterval(function(){
      var page = $('.page:first');
      debug(
        'viewport height: '+VIEWPORT.height()  +'\n'+
        'viewport width:  '+VIEWPORT.width()   +'\n'+
        'canvas width:    '+CANVAS.width()     +'\n'+
        'canvas height:   '+CANVAS.height()    +'\n'+
        'page width:    '+page.width()     +'\n'+
        'page height:   '+page.height()    +'\n'+
        'canvas top:      '+CANVAS.css('top')  +'\n'+
        'canvas left:     '+CANVAS.css('left') +'\n'
      )
    }, 1000);

  });




})(jQuery);

