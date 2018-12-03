(function ($) {
"use strict";



// One Page Nav
var top_offset = $('.header-area').height() - 0;
$('.main-menu nav ul').onePageNav({
	currentClass: 'active',
	scrollOffset: top_offset,
});






// sticky
var wind = $(window);
var sticky = $('#sticky-header');
wind.on('scroll', function () {
	var scroll = wind.scrollTop();
	if (scroll < 1) {
		sticky.removeClass('sticky');
	} else {
		sticky.addClass('sticky');
	}
});


/* counter */
$('.counter').counterUp({
    delay: 10,
    time: 1000
});


/* screenshots-active */
$('.screenshots-active').owlCarousel({
    loop:true,
    nav:false,
	dots:true,
    responsive:{
        0:{
            items:1,
			dots:false
        },
        576:{
            items:2
        },
        768:{
            items:3
        },
        992:{
            items:4
        },
        1200:{
            items:5
        }
    }
})


/* testimonial-active */
$('.testimonial-active').owlCarousel({
    loop:true,
    nav:false,
	dots:true,
	autoplay:true,
    responsive:{
        0:{
            items:1
        },
        767:{
            items:1
        },
        1000:{
            items:1
        }
    }
})




// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp', // Element ID
	topDistance: '300', // Distance from top before showing element (px)
	topSpeed: 300, // Speed back to top (ms)
	animation: 'fade', // Fade, slide, none
	animationInSpeed: 200, // Animation in speed (ms)
	animationOutSpeed: 200, // Animation out speed (ms)
	scrollText: '<i class="fa fa-angle-up"></i>', // Text for element
	activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
});

// WOW active
new WOW().init();


})(jQuery);