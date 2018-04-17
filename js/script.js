$(document).ready(function(){
    $('#buttonFeatures').click(function () {
        $('html, body').animate({
            scrollTop: $("#features").offset().top
        }, 2500);
    });
    $('#buttonContact').click(function () {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 2500);
    });

     $('#aboutButton').click(function () {
         $('html, body').animate({
             scrollTop: $("#about").offset().top
         }, 2500);
     });
    $('#buttonGetStarted').click(function () {
          $('html, body').animate({
              scrollTop: $("#div-getstarted").offset().top
          }, 2500);
      });
    $('#btnTakeMeHome').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });
});