import Section from './Section';


let _App = {
  init: function(){
    console.log("app loaded");
        
  },

  loop: function(){
    // utils.clearCanvas(_App, true);
    // window.requestAnimationFrame(_App.loop);
  },
  //
  updateSize: function(e){
    e = e || window.event;

    if(_App.ctx != undefined){
      _App.ctx.canvas.width = document.documentElement.clientWidth;
      _App.ctx.canvas.height = document.documentElement.clientHeight;
      
      _App.w = _App.ctx.canvas.width;
      _App.h = _App.ctx.canvas.height;
    }
    
    
    
  },
  start: function(){
    let section = new Section();
    section.init(_App);
  }
}
//
window.onload=function(){

  window._App = _App;
  window.addEventListener("resize", _App.updateSize);

  _App.init();
  _App.updateSize();

  _App.start();
  
}


