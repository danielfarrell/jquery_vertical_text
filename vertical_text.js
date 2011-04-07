(function($){

  $.fn.verticalText = function(options) {
    var target, canvas, text, size
    
    this.each(function() {
      target = $(this);
      canvas = $('<canvas/>')[0];
      if (!canvas.getContext) return;

      text = getAttributes(target);
      size = findSize(text);

      target.before(canvas);
      target.remove();

      canvas.width = size.height;
      canvas.height = size.width;

      addText(canvas, text, size);
    });
  };

  function getAttributes(target){
    var text = {};
    text.value = target.html();
    text.font = target.css('font-family');
    text.size = parseInt(target.css('font-size'));
    text.weight = target.css('font-weight');
    text.style = target.css('text-style');
    text.color = target.css('color');
    return text;
  };

  function findSize(text){
    var ruler, size;

    ruler = $('<span/>');
    $('body').append(ruler);
    ruler.html(text.value);
    ruler.css('visibility', 'hidden').css('white-space', 'nowrap');
    ruler.css('padding', 0).css('margin', 0);
    ruler.css('font-family', text.font);
    ruler.css('font-size', text.size + 'px');
    ruler.css('font-weight', text.weight);
    ruler.css('text-style', text.style);
    size = {height: ruler[0].offsetHeight, width: ruler[0].offsetWidth}
    ruler.remove();
    return size;
  };

  function addText(canvas, text, size){
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = text.color;
    ctx.translate( canvas.width - (size.height - text.size), canvas.height);
    ctx.rotate(270 * Math.PI / 180);
    ctx.font = text.style + " " + text.weight + " " + text.size + "px " + text.font;
    ctx.fillText(text.value, 0, 0);    
  };

})( jQuery );

$(document).ready(function(){
  $('.verticaltext').verticalText();
});
