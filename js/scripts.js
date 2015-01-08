// remap jQuery to $
(function($){

  "use strict";

  /* trigger when page is ready */
  $(document).ready(function (){

    $('img.lazy').lazyload({
      event: "lazyEvent",
      custom_event_immediate_load: false,
      effect : "fadeIn"
    });

    $('.post-link').mouseenter(function(e) {
      $(this).closest('.work').find('img.lazy').trigger("lazyEvent");
    });

  });


})(window.jQuery);