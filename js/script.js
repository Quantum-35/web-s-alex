$(document).ready(function(){
    $('#buttonFeatures').click(function () {
        $('html, body').animate({
            scrollTop: $("#features").offset().top
        }, 1000);
    });
    $('#buttonContact').click(function () {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 1000);
    });
    $('#btnTakeMeHome').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });
});