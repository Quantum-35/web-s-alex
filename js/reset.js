$(document).ready(function () {
    $('#success').css('display', 'none');
    $('#error').css('display', 'none');
    // Get the code 
    function gup(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    }


    $('#buttonReset').click(function (e) {
        e.preventDefault();
        $('#buttonReset').attr("disabled", "disabled");
        $('#success').text('');
        $('#error').text('');
        var password = $('#password').val();
        var passwordRepeat = $('#repeatPassword').val();

        if (password === passwordRepeat) {
            var code = gup("code", window.location.search);
            let params = {
                code: code,
                password: password
            };
            $.ajax({
                    type: 'PUT',
                    url: 'http://api.ban-q.com/v0/password-reset',
                    data: params
                })
                .done(function (data) {
                    console.log(data);
                    $('#success').text('Password reset successfully');
                    $('#success').css('display', 'block');
                })
                .fail(function (error) {
                    console.log(error);                    
                    $('#error').text('Password reset failed, please try again later');
                    $('#error').css('display', 'block');
                })
                .always(function () {
                    $('#buttonReset').removeAttr("disabled");
                });
        }else {
            // passwords don't match 
            $('#buttonReset').removeAttr("disabled");
            $('#error').text("Passwords don't match");
            $('#error').css('display', 'block');
        }
    });
});