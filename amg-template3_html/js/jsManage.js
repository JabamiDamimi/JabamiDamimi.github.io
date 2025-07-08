// Menu
$(function() {

    var menuButtonLine = $('<span></span><span></span><span></span>'),
        menuFold = $('<span class="menu-fold"></span>'),
        menuBtn = $('.menu-btn'),
        menuMain = $('.menu-main'),
        menuGroup = $('.menu-group'),
        menuDropDown = $('.menu-dropDown'),
        menuLists = $('.menu-lists'),
        menuSearch = $('.menu-search');

    menuButtonLine.appendTo(menuBtn);
    menuLists.before(menuFold);

    $('.left-top').append('<i class="btn-nav"></i>');

    mobile();

    $(window).resize(function() { 
        mobile();
    });
    
    // PC & Mobile Clear, Move ( lang & Inquiry )
    function mobile() {
        $('.left-top').unbind();

        if (menuBtn.is(':hidden')) {

            // PC Visible

            // $('.menu-language').appendTo(menuGroup);
            // $('.inquiry').prependTo(menuGroup);
            menuMain.find('.sitemap').remove();

            $('.menu, .menu-lists').attr('style','');
            menuBtn.removeClass('open');
            $('header').removeClass('menuOpen');

            

        } else{

            // Mobile Visible

            // $('.menu-language').prependTo(menuMain);
            // $('.inquiry').appendTo(menuMain);
    
        }

    }
    // Mobile MenuButton
    menuBtn.click(function() {
        $(this).next('.menu').slideToggle(800).end().toggleClass('open');
        $('header').toggleClass('menuOpen'); //控制底色
    });

    //PC Hover
    menuDropDown.hover(function() {
        if (menuBtn.is(':hidden')) {
            $(this).find(menuLists).stop().fadeToggle();
        }
    });

    //Moblie SubMenu Button
    $('.menu-fold').click(function() {
        $(this).next(menuLists).stop().slideToggle().end().toggleClass('open');
    });

	// Language
	$('.menu-language-btn').click(function() {
		$(this).next('.menu-language-options').stop().slideToggle().end().toggleClass('open');
	});

    // Search
    var SearchInpt = menuSearch.find('input');

    menuSearch.hover(function() {
        SearchInpt.addClass('inptOpen');
    }, function() { SearchVal(); });

    SearchInpt.change(function() { SearchVal(); });

    function SearchVal() {
        if (SearchInpt.val() == "") {
            SearchInpt.removeClass('inptOpen');
        } else{ SearchInpt.addClass('inptOpen'); }
    }
});

// Mobile Sidebar
$(function() {
    var $clone = $('.side_classLink > ul').clone(),
        $current_txt = $('.side_classLink > ul').find('.current02').text();
        
        $('.side_classLink').after('<div class="m_classLink"><a class="main"><b></b><i class="fa-angle-down"></i></a></div>');
        $('.m_classLink').append($clone).end().find('a.main b').text($current_txt);

    var isT = true;
        $('.m_classLink').click(function(){
            if(isT){
                isT = false;
                $(this).find('i.fa-angle-down').removeClass().addClass('fa-angle-up').attr('href','');
                $(this).find('ul').stop().slideDown(200);
            }
            else{
                isT = true;
                $(this).find('i.fa-angle-up').removeClass().addClass('fa-angle-down').attr('href','');
                $(this).find('ul').stop().slideUp(200);
            }
        });
});

AOS.init({
    easing: 'ease-in-out-sine'
});

// Go Top
$(function() {
    $(window).scroll(function (event) {

        var threshold = $(document).height() - $(window).height() - $('footer').height();

        if ($(window).scrollTop() > 110){
            $('header').addClass('menuMov');
        } else{
            $('header').removeClass('menuMov')
        }

        if ($(window).scrollTop() > 0) {
            $('div.gotopBox').fadeIn(400);

            if ( $(window).scrollTop() >= threshold ) {
                $('.pagetopbtn').addClass('gotopMov');
            } else {
                $('.pagetopbtn').removeClass('gotopMov');
            }
        } else {
            $('div.gotopBox').fadeOut(400);
        }

    });

    $('div.pagetopbtn').click(function () {
        $("html, body").animate({scrollTop:0}, 500, 'swing');
    });
});

//  Index Banner
$(function(){
    $('.owl-idxbanner').owlCarousel({
        loop:true,
        autoplay:true,
        nav:false,
        navText:['',''],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items:1,
        margin:0,
        stagePadding:0,
        smartSpeed:450,
        responsive:{
            0:{
                dots:false
            },
            420:{
                dots:true
            }
        }
    });
});

// Index Product
$(function(){
    $('.idx-pro-list').owlCarousel({
        loop:true,
        autoplay:true,
        margin:0,
        nav:true,
        navText:['',''],
        stagePadding:0,
        autoplayTimeout:2500,
        responsive:{
            0:{ items:1 },
            768:{ items:2 },
            979:{ items:3 },
            1199:{ items:4 }
        }
    });
});

// About
$(function(){
   $('.timeline-nav').slick({
      slidesToShow: 12,
      slidesToScroll: 1,
      asNavFor: '.timeline-slider',
      centerMode: false,
      focusOnSelect: true,
       mobileFirst: true,
      arrows: false,
      infinite:false,
       responsive: [
           {
          breakpoint: 768,
          settings: {
            slidesToShow: 8,
           }
          },
         {
          breakpoint: 0,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
          }
        }
     ]
  });
  
   $('.timeline-slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.timeline-nav',     
      centerMode: true,     
      cssEase: 'ease',
       edgeFriction: 0.5,
       mobileFirst: true,
       speed: 500,
       responsive: [
         {
          breakpoint: 0,
          settings: {
              centerMode: false
          }
        },
           {
          breakpoint: 768,
          settings: {
              centerMode: true
          }
        }
     ]
  });
 
});

// products Img
$(function() {

    $('.owl-prodetail').owlCarousel({
        loop:true,
        margin: 10,
        dots:true,
        nav:true,
        navText:['',''],
        items:1
    });
    
    // var detailLeft = $('.products-detail-list .left');
    // var $frame =detailLeft, $showImage = $frame.find('.showimg');

    // $frame.find('.owlpro .item').click(function(){
    //     var $this = $(this),
    //         _src = $this.find('img').attr('src');
    //     if($showImage.attr('src') != _src){
    //         $showImage.hide().attr('src', _src).stop(false, true).fadeTo(100, 1);
    //     }
    // });

});

$(function() {
    //Horizontal Tab
    $('#parentHorizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        tabidentify: 'hor_1', // The tab groups identifier
        activate: function(event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#nested-tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });
});

// FAQ
$(function() {

    $('.jsFaq').each(function() {
        
        var qabtn = $('<span class="qaIcon"></span>');
        $('.qa_title').append(qabtn);
        
        $('.qa_title').click(function(event) {

            var $qa_title = $('.qa_title');
            var $qa_answer = $(this).next('div.qa_answer');

            if(!$qa_answer.is(':visible')){
                $qa_title.removeClass('qa_title_no');
                $('.qa_answer:visible').slideUp();
            }

            $(this).toggleClass('qa_title_no');
            $qa_answer.slideToggle();

        }).siblings('.qa_answer').hide();

    });

    $('.qa_title').on('click',function(){
        $(this).parent().siblings().find('.qa_answer').slideUp().end().find('.qa_title').removeClass('current');
        $(this).next().stop().slideToggle().end().toggleClass('current');
    });

});


// FAQ Number
$(function() {

    $('.faqNumber').each(function() {
        var qaList = $('<div class="qaList"></div>');
        qaList.prependTo('.qa_title');

        $('.qa_title').each(function() {
            var nub = $(this).data('number');
            $(this).find('.qaList').text(nub);
        });

    });

});

