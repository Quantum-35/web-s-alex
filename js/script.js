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
   
    function gup( name, url ) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var regexS = "[\\?&]"+name+"=([^&#]*)";
        var regex = new RegExp( regexS );
        var results = regex.exec( url );
        return results == null ? null : results[1];
    }
    var code = gup('code',window.location.search);
    if(code != null) {
        $('.someBlock').preloader({
            text: 'Verifying email',
            percent: '',
            duration: '1000000000'
        });
        var params = {
            code: code
        };
        $.ajax({
            type: 'PUT',
            url: 'http://api.ban-q.com/v0/email-verification/verify',
            date: params
        })
        .done(function() {
            $('#success').text('Email verified successfully');
          })
          .fail(function(error) {
            $('#error').text('Error occoured while verifying your email, please try again later');
          })
          .always(function(){
              $('.someBlock').preloader('remove');
          })
    }
});
