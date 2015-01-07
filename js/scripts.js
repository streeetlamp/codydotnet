// remap jQuery to $
(function($){

  "use strict";

  /* trigger when page is ready */
  $(document).ready(function (){

    var link;
    var workWindow = $('.work-window');

    $('.post-link').click(function(e) {
      e.preventDefault();
      link = this.href;
      workWindow.toggleClass("js-open");
      $('.window-wrap').append( "<div class='overlay'></div>" );

      setTimeout(showImg, 400);
    });

    function showImg() {
      workWindow.append("<img src='"+ link +"' style='display: none;'>");
      $('.work-window img').fadeIn();
    }

    $('.window-wrap').on('click', '.overlay' ,function(){
      workWindow.removeClass("js-open").html("");
      $('.overlay').remove();
    });

    function loadProject(link) {
      workWindow.load(link +" #work-content");
    }

  });


})(window.jQuery);