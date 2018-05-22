$(document).ready(function () {
    $('#success_message').hide();
    $('#error_message').hide();
    $('#success').css('display', 'none');
    $('#error').css('display', 'none');
   
    $('#buttonReset').click(function (e) {
        e.preventDefault();
        resetPassword();
    });


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

    function resetPassword() {

        var success_message = $('#success_message');
        var error_message = $('#error_message');
        var btn = $('#buttonReset');
    
        if ($('#password').val().length < 6) {
            error_message.show();
            success_message.hide();
            error_message.text("password should be at least 6 letters");
            return false;
        }
    
        if ($('#password').val() != $('#repeatPassword').val()) {
            error_message.show();
            success_message.hide();
            error_message.text("Sorry, passwords don't match!");
            return false;
        }
    
        btn.attr('disabled', 'disabled');
        error_message.hide();
        success_message.show();
        success_message.text('Updating password...');
    
        var code = getUrlParameter('c');
        if (code) {
            request = $.ajax({
                url: 'http://api.ban-q.com/v0/password-reset',
                type: "put",
                data: JSON.stringify({
                    code: code,
                    password: $('#password').val()
                })
            });
    
            // Callback handler that will be called on success
            request.done(function (response, textStatus, jqXHR) {
                $('#buttonReset').removeAttr('disabled');
                error_message.hide();
                success_message.show();
                success_message.text('Password updated!');
            });
    
            // Callback handler that will be called on failure
            request.fail(function (jqXHR, textStatus, errorThrown) {
                $('#buttonReset').removeAttr('disabled');
                error_message.show();
                success_message.hide();
                // Log the error to the console
                if (jqXHR.status == 400) {
                    message.text('Sorry, link invalid or expired');
                } else if (jqXHR.status == 404){
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
        }
        else {
            error_message.show();
            success_message.hide();
            error_message.text('Sorry, link invalid or expired');
        }
    }
});