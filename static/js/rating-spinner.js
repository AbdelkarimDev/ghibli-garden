(function ($) {
    var $spinner = $('.spinner input');
    $('.spinner .btn:first-of-type').on('click', function() {
        $spinner.val( parseVal() + 1);
    });
    $('.spinner .btn:last-of-type').on('click', function() {
        $spinner.val(parseVal() - 1);
    });

    function parseVal(){
        return parseInt($spinner.val(), 10);
    }
})(jQuery);