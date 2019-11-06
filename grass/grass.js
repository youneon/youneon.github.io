$(document).ready(function() {
    $('.touch-hover').bind('touchstart touchend', function(e) {
        e.preventDefault();
        $(this).toggleClass('');
    });
});