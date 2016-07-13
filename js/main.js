$(function(){
  var $window = $(window);
  $('section[data-type="background"]').each(function(){

    var $bgobj = $.this; //assign obsject

    $window.scroll(function(){
        var yPos = -($window.scrollTop()/ $bgobj.data('speed'));
        var coords = '50% ' + yPos + 'px';
        $bgobj.css({ background-position: coords });
    });
  });
});
