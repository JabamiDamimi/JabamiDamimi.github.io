// JavaScript Document

/*---------------- go-top ---------------*/
$(function () {
	$("#gotop").click(function () {
		jQuery("html,body").animate({
			scrollTop: 0
		}, 1000);
	});
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			$('#gotop').fadeIn("fast");
		} else {
			$('#gotop').stop().fadeOut("fast");
		}
	});
});




/**** lang *****/
$(document).ready(function(){
    $(".lang").click(function(){
        $(".lang-open").animate({
            height: 'toggle'
        });
    });
});



/*rwd-menu*/
$(document).on("click",".showhide",function(){
	if ($(this).hasClass("showhide-rotate")) {
			$(this).removeClass("showhide-rotate");
		} else {
			$(this).stop().addClass("showhide-rotate");
		}
});


$(document).ready(function() {
	var s = $(".header-top");
	var pos = s.position();					   
	$(window).scroll(function() {
		var windowpos = $(window).scrollTop();
		if (windowpos >= pos.top + 300) {
			s.addClass("header-scroll");
		} else {
			s.removeClass("header-scroll");	
		}
	});
});
