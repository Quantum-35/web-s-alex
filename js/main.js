var mobile = document.createElement('div');

mobile.className = ' nav-mobile';

document.querySelector('.nav').appendChild(mobile);

function hasClass(elem, className){
    return new RegExp(' ' + className + ' ').test( '  ' + elem.className + ' ');
}

function toggleClass(elem, className){
    var newClass = '  ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';

    if (hasClass (elem, className)){
        while (newClass.indexOf(' ' + className + '  ') >= 0){
            newClass = newClass.replace( ' ' + className + '  ', '  ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, ' ');
    }
    else{
        elem.className += ' ' + className;
    }
}

var mobileNav = document.querySelector( '.nav-mobile');
var toggle = document.querySelector( ' .nav-list');

mobileNav.onclick = function(){
    toggleClass(this, 'nav-mobile-open');
    toggleClass(toggle, 'nav-active');
}