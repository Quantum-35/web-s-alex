$(document).ready(function () {
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
        $('html, body').animate({scrollTop: 0}, 1000);
    });

    // URL params 
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    var code = getUrlParameter('c', window.location.search);
    if (code) {
        verifyEmail();
    } else {
        $('#error').text('Sorry, link invalid or expired');
    }


    function verifyEmail() {
        var error_message = $('#error');
        var success_message = $('#success');
        $('.someBlock').preloader({
            text: 'Verifying email',
            percent: '',
            duration: '1000000000'
        });

        var params = {
            code: code
        };

        if (code) {
            request = $.ajax({
                url: 'http://api.ban-q.com/v0/email-verification/verify',
                type: "put",
                data: JSON.stringify(params)
            });

            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR) {
                error_message.hide();
                success_message.show();
                success_message.text('Email verified successfully!');
            });

            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {

                error_message.show();
                success_message.hide();
                // Log the error to the console
                if (jqXHR.status == 400) {
                    error_message.show();
                    success_message.hide();
                    error_message.text('Sorry, link invalid or expired');
                } else if (jqXHR.status == 404) {
                    error_message.show();
                    success_message.hide();
                    error_message.text('Sorry, link invalid or expired');
                }
                else {
                    error_message.show();
                    success_message.hide();
                    error_message.text('Sorry unable to connect. Try again');
                }
            });

            request.always(function () {
                $('.someBlock').hide();
            })
        }
        else {
            error_message.show();
            success_message.hide();
            error_message.text('Sorry, link invalid or expired');
        }
    }
});
