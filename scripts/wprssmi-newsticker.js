(function ($) {
    $.fn.extend({
        vscroller: function (options) {
            var settings = $.extend({ speed: 1800, stay: 2000, newsfeed: '', cache: true }, options);

            return this.each(function () {
                var interval = null;
                var mouseIn = false;
                var totalElements;
                var isScrolling = false;
                var h;
                var t;
                var wrapper = $('.wprssmi-news-wrapper');
                        var newsContents = $('.wprssmi-news-contents');
                      
                        var i = 0;
                        totalElements = $.find('.wprssmi-news').length;
					
                        h = parseFloat($('.wprssmi-news:eq(0)').outerHeight());
                        $('.wprssmi-news', wrapper).each(function () {
                            $(this).css({ top: i++ * h });
                        });
                        t = (totalElements - 1) * h;
                        newsContents.mouseenter(function () {
                            mouseIn = true;
                            if (!isScrolling) {
                                $('.wprssmi-news').stop(true, false);
                                clearTimeout(interval);
                            }
                        });
                        newsContents.mouseleave(function () {
                            mouseIn = false;
                            interval = setTimeout(scroll, settings.stay);
                        });
                        interval = setTimeout(scroll, 1);
                    
                function scroll() {
                    if (!mouseIn && !isScrolling) {
                        isScrolling = true;
                        $('.wprssmi-news:eq(0)').stop(true, false).animate({ top: -h }, settings.speed, function () {

                            clearTimeout(interval);
                            var current = $('.wprssmi-news:eq(0)').clone(true);
                            current.css({ top: t });
                            $('.wprssmi-news-contents').append(current);
                            $('.wprssmi-news:eq(0)').remove();
                            isScrolling = false;
                            interval = setTimeout(scroll, settings.stay);

                        });
                        $('.wprssmi-news:gt(0)').stop(true, false).animate({ top: '-=' + h }, settings.speed);
                    }
                }
              
            });
        }
    });
})(jQuery);
