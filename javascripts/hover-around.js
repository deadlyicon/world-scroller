(function(){

  // jQuery.hoverAround({top:'5px', left:'5px'})
  jQuery.fn.hoverAround = function(radius, duration) {
    var self = this, pi2 = (2*Math.PI);
    self.css({position:'relative', nothing:0});
    self.animate({nothing: 1}, {
      duration: duration,
      easing: 'linear',
      step: function(p) {
        var
          t = p * pi2,
          x = radius * Math.cos(t),
          y = radius * Math.sin(t);
        // console.log(x,y);
        self.css({left: mRound(x)+'px', top: mRound(y)+'px'});
      },
      complete: function() {
        self.hoverAround(radius, duration);
      }
    });
    return self;
  };


  function round3(n) {
    return Math.round(n * 10) / 10;
  };

  function mRound(n){
    try{
    var
      n  = Math.round(n * 10) / 10,
      m  = n.toString().match(/^(-?\d+)(?:\.(\d+))?$/),
      rn = Number(m[1]),
      d  = Number(m[2] || 0);

    return (d > 7) ? rn+1 : (d < 3) ? rn : rn + .5;
    }catch(e){
      console.warn(n)
      return n
    }
  }

})();