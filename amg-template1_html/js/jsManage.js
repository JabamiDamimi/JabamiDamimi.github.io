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

    mobile();

    $(window).resize(function() { 
        mobile();
    });

    // PC & Mobile Clear, Move ( lang & Inquiry )
    function mobile() {
        
        if (menuBtn.is(':hidden')) {

            // PC Visible

            $('.menu-language').appendTo(menuGroup);
            $('.inquiry').prependTo(menuGroup);
            $('.menu, .menu-lists').attr('style','');
            menuBtn.removeClass('open');
            $('header').removeClass('menuOpen');

        } else{

            // Mobile Visible

            $('.menu-language').prependTo(menuMain);
            $('.inquiry').appendTo(menuMain);
            
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

// Edit
$(function() {
    $('.edit-box table').wrap('<div class="table_scroll"></div>');
});

// Go Top
$(function() {
    $(window).scroll(function (event) {

        var threshold = $(document).height() - $(window).height() - $('footer').height();

        if ($(window).scrollTop() > 0) {
            $('div.gotopBox').fadeIn(400);

            if ( $(window).scrollTop() >= threshold ) {
                $('.pagetopbtn').css({
                    top: "-65px",
                    right: "20px",
                    bottom: "auto",
                    position: "absolute"
                });
            } else {
                $('.pagetopbtn').css({
                    top: "auto",
                    right: "20px",
                    bottom: "20px",
                    position: "fixed"
                });
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
        dots:true,
        nav:false,
        navText:['',''],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items:1,
        margin:0,
        stagePadding:0,
        smartSpeed:450
    });
});

// Index Product
$(function(){
    $('.owl-idxpro').owlCarousel({
        loop:true,
        autoplay:true,
        margin:0,
        dots:false,
        nav:true,
        navText:['',''],
        responsive:{
            0:{
                items:2
            },
            1024:{
                items:3
                
            },
            1280:{
                items:4
            }
        }
    });
});

// products Img
$(function() {

    $('.owlpro').owlCarousel({
        loop:true,
        margin: 10,
        dots:false,
        nav:true,
        navText:['',''],
        responsive:{
            0:{
                items:3
            },
            600:{
                items:4
                
            },
            1000:{
                items:4
            }
        }
    });
    
    var detailLeft = $('.products-detail-list .left');
    var $frame =detailLeft, $showImage = $frame.find('.showimg');

    $frame.find('.owlpro .item').click(function(){
        var $this = $(this),
            _src = $this.find('img').attr('src');
        if($showImage.attr('src') != _src){
            $showImage.hide().attr('src', _src).stop(false, true).fadeTo(100, 1);
        }
    });

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

