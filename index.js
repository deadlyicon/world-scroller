Number.prototype.times = function(block){
  for (var i=0; i < this; i++) block(i);
};


$(document).ready(function(){

  var canvas = $('#canvas');

  ;(function() {
    var
      width  = canvas.width(),
      height = canvas.height(),
      blocks = [],
      block  = $('<div class="block">').css({
        position: 'absolute',
        height: '100px',
        width : '100px',
        border: '1px solid black'
      });

      (height / 100).times(function(h){
        (width / 100).times(function(w){
          var top = h * 100, left = w * 100, clone;
          clone = block.clone();
          clone.css({top:top,left:left});
          clone.text(top+'x'+left);
          blocks.push(clone[0]);
        });
      });
      
      $(blocks).appendTo(canvas);

  })();



});