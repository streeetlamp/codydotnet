// remap jQuery to $
(function($){

  "use strict";

  /* trigger when page is ready */
  $(document).ready(function (){

    var $workLink = $('.work-link');

    var $container = $('#index-grid').imagesLoaded( function() {
      $container.isotope({
        // options
        itemSelector: '.work',
        layoutMode: 'masonry',
        isInitLayout: false
      });
      $container.isotope('shuffle');
    });

    $('img.lazy').lazyload({
      event: "lazyEvent",
      custom_event_immediate_load: false,
      effect : "fadeIn"
    });

    $workLink.mouseenter(function(e) {
      $(this).closest('.work').find('img.lazy').trigger("lazyEvent");
    });

    $workLink.hover(function(e){
      $workLink.not(this).addClass("js-opacity");
    }, function(e){
      $workLink.removeClass("js-opacity");
    });

  });


})(window.jQuery);