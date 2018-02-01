$(document).ready(function(){
    // get url parameters
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return decodeURI(results[1]) || 0;
        }
    };
    // Get the code 
   

    $('#buttonReset').click(function(e){
        e.preventDefault();
        var code = $.urlParam('code');
        var password = $('#password').val();
        var passwordRepeat = $('#repeatPassword').val();

        if(password != undefined && passwordRepeat != undefined){
            
        }
    });
});