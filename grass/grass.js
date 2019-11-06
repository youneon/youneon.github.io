$(document).ready(function() {
    $('.bar').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('tilted');
    });
});