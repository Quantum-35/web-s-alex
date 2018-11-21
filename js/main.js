const isDEV = false;

const BASE_URL = isDEV ? 'http://localhost:8000/v0' : 'https://api.ban-q.com/v0';

//Get url parameters

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


//Confirm email
function confirmEmail() {
    var code = getUrlParameter('c');
    if (code) {
        request = $.ajax({
            url: BASE_URL + '/email-verification/verify',
            type: "put",
            data: JSON.stringify({
                code: code
            })
        });

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR) {
            $('#message').text('Email confirmed, thank you!');
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {
            // Log the error to the console
            if (jqXHR.status == 400) {
                $('#message').text('Sorry, link invalid or expired');
            }
            else {
                $('#message').text('Sorry unable to connect. Try refreshing page');
            }
        });
    }
    else {
        $('#message').text('Sorry, link invalid or expired');
    }
}

//Reset password
function resetPassword() {

    var message = $('#message');
    var btn = $('#btn');

    if ($('#newPassword').val().length < 6) {
        message.removeClass('success');
        message.addClass('alert');
        message.text("password should be at least 6 letters");
        return false;
    }

    if ($('#newPassword').val() != $('#confirmPassword').val()) {
        message.removeClass('success');
        message.addClass('alert');
        message.text("Sorry, passwords don't match!");
        return false;
    }

    btn.attr('disabled', 'disabled');
    message.removeClass('alert');
    message.addClass('success');
    message.text('Updating password...');

    var code = getUrlParameter('c');
    if (code) {
        request = $.ajax({
            url: BASE_URL + '/password-reset',
            type: "put",
            data: JSON.stringify({
                code: code,
                password: $('#newPassword').val()
            })
        });

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR) {
            $('#btn').removeAttr('disabled');
            message.removeClass('alert');
            message.addClass('success');
            message.text('Password updated!');
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {
            $('#btn').removeAttr('disabled');
            message.removeClass('success');
            message.addClass('alert');

            // Log the error to the console
            if (jqXHR.status == 400) {
                message.text('Sorry, link invalid or expired');
            }
            else {
                message.text('Sorry unable to connect. Try again');
            }

            console.log(jqXHR);
        });
    }
    else {
        message.removeClass('success');
        message.addClass('alert');
        message.text('Sorry, link invalid or expired');
    }
}