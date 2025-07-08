// Variables ==================================================================
var $window = $(window),
    $header = $('header'),
    $body = $('body'),
    rwd = 992;
// Plug-in ====================================================================

// Lazyload
function lazyloadFn() {
    $('[data-src]').lazyload();
    // if(){
    // }
    // $('img').lazyload({
    //     effect: 'fadeIn'
    // });
}

// AOS
function aosFn() {
    AOS.init({
        duration: 1000,
        // easing: 'ease-in-out-quad',
        // default easing for AOS animations
        offset: 100,
        mirror: true
        // whether animation should happen only once - while scrolling down

    });
}

// Swiper
var swp = {
    index: function () {
        var idxSer = new Swiper('.idx-ser_swp', {
            spaceBetween: 30,
            slidesPerView: 4,
            speed: 1000,
            // loop: true,
            // centeredSlides: true,
            // noSwiping: true,
            breakpoints: {
                1366: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                575: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                375: {
                    spaceBetween: 10,
                    slidesPerView: 1,
                }
            }
        });

    },
    pro: function () {
        var banner = new Swiper('.prod_pic-swp', {
            spaceBetween: 0,
            slidesPerView: 1,
            speed: 1000,
        });
    },
    prod: function () {

        var opt = new Swiper('.prod-swp_opt', {
            spaceBetween: 10,
            slidesPerView: 3,
            speed: 1000,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            // navigation: {
            //     nextEl: '.prod-data_swp-opt .js-swp-next',
            //     prevEl: '.prod-data_swp-opt .js-swp-prev'
            // }
        });

        var show = new Swiper('.prod-swp_show', {
            spaceBetween: 0,
            slidesPerView: 1,
            speed: 1000,
            thumbs: {
                swiper: opt
            }
        });

    }
}

// Element ====================================================================
// LockScroll
function lockScroll() {
    $body.addClass('u-scroll-no fancybox-active compensate-for-scrollbar');
};
function unlockScroll() {
    $body.removeClass('u-scroll-no fancybox-active compensate-for-scrollbar');
}

// Menu
function menu() {

    var menu = {
        click: function () {
            var btn = $('.hd_toggle'),
                ctr = $('.hd_nav'),
                mask = $('<div class="is-mask"></div>');

            mask.appendTo(ctr);

            function hamburgerToggle() {
                ctr.toggleClass('is-show');
                btn.toggleClass('is-active');
                $('.hd').toggleClass('is-open');
                $('body').toggleClass('u-scroll-no');
            }

            btn.click(function () {
                hamburgerToggle();
            });
            ctr.find('.is-mask').click(function () {
                hamburgerToggle();
            });
            $('.menu_link').click(function () {
                ctr.removeClass('is-show');
                btn.removeClass('is-active');
                $('.hd').removeClass('is-open');
                $('body').removeClass('u-scroll-no');
            });

        },
        move: function () {
            var init = $(window).scrollTop();

            if (init != 0) {
                $('.hd').removeClass('is-top').addClass('is-move');
                // console.log('menu is-move');

            } else {
                $('.hd').addClass('is-top');
                // console.log('menu is-top');
            }

            var lastScrollTop = 0;
            $(window).scroll(function () {

                if ($(window).scrollTop() > 0) {
                    $('.hd').removeClass('is-top');
                    $('.hd').removeClass('is-top').addClass('is-move');
                } else {
                    $('.hd').addClass('is-top')
                    $('.hd').addClass('is-top').removeClass('is-move');
                }

                var sticky = $('.hd'),
                    scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

                // console.log(scrollBottom);

                scroll = $(window).scrollTop();

                if (scroll >= 10 && scroll < lastScrollTop) {
                    if (scroll >= 0) {
                        sticky.addClass('is-fadein');
                    }
                } else {
                    sticky.removeClass('is-fadein');
                }

                lastScrollTop = scroll;

            });
        },
        active: function () {
            var _page = $('.l-wp-html').data('id');
            $('.menu_item[data-active="' + _page + '"]').find('.menu_link').addClass('active');
        },
        setting: function () {
            this.active();
            this.click();
            this.move();
        }
    }
    menu.setting();

    // Search
    function search() {
        var btn = $('.hd-search_btn'),
            ctr = $('.hd-search_ctr'),
            inpt = ctr.find('.m-fm_input');

        btn.click(function () {
            ctr.toggleClass('is-show');
            $('.hd').toggleClass('is-search-open');
        });
        if ($('.hd-toggle').is(':visible')) {
            inpt.attr('placeholder', '');
        }
    }
    search();

    // Lang
    function lang() {
        $('.lang_toggle').click(function () {
            $(this).next('.lang_ctr').toggleClass('is-show').end().toggleClass('is-active');
        });
    }
    lang();
}

// Click
var clickFn = {
    bnScroll: function (ele, tag, repair) {
        var _repair = repair;
        // console.log(_repair);

        if (_repair == undefined) {
            _repair = 0;
        }
        scrollFn(ele, tag, _repair);

        // if ($(window).width() > 1200) {
        //     _repair = 90;

        //     scrollFn(ele, tag, _repair);
        // } else {
        //     _repair = 55;

        //     scrollFn(ele, tag, _repair);
        // }

        function scrollFn(a, b, c) {
            $(a).click(function () {
                var thisID = b;
                $('body,html').animate({
                    scrollTop: $(thisID).offset().top - c
                }, 600);
            });
        }
    },
    gotop: function (bk, btn) {

        var init = $(window).scrollTop();
        var initThreshold = $(document).height() - $(window).height() - $('footer').height();
        if (init != 0) {
            $(bk).removeClass('is-top');
        } else {
            $(bk).addClass('is-top');
        }

        if (init >= initThreshold) {
            $(bk).removeClass('is-move');
        } else {
            $(bk).addClass('is-move');
        }

        var lastScrollTop = 0;
        $(window).scroll(function () {

            var threshold = $(document).height() - $(window).height() - $('footer').height();

            if ($(window).scrollTop() > 0) {
                $(bk).removeClass('is-top').addClass('is-show');

                if ($(window).scrollTop() >= threshold) {
                    $(bk).removeClass('is-move');
                } else {
                    $(bk).addClass('is-move');
                }
            } else {
                $(bk).removeClass('is-show').addClass('is-top');
            }

        });

        $(bk).find(btn).click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 500, 'swing');
        });
    },
    back: function (ele) {
        $(ele).click(function () {
            history.back();
        });
    },
    msg: function () {
        var bk = $('.messenger'),
            btn = $('.messenger_toggle'),
            ctr = $('.messenger_list');
        btn.click(function () {
            bk.toggleClass('is-open');
        })

        var init = $(window).scrollTop();
        var initThreshold = $(document).height() - $(window).height() - $('footer').height();
        if (init != 0) {
            bk.addClass('is-show');
        } else {
            bk.removeClass('is-show');
        }
        if (init >= initThreshold) {
            bk.removeClass('is-move');
        } else {
            bk.addClass('is-move');
        }

        $(window).scroll(function () {

            var threshold = $(document).height() - $(window).height() - $('footer').height();
            if ($(window).scrollTop() > 0) {
                bk.addClass('is-show');

                if ($(window).scrollTop() >= threshold) {
                    bk.removeClass('is-move');
                } else {
                    bk.addClass('is-move');
                }
            } else {
                bk.removeClass('is-show');
            }
        });
    },
    other: function () {
        $('.m-btn.m-btn--more').hover(function () {
            $(this).toggleClass('is-hover');
        });
    }
}

// Sidebar
function sidebarFn() {
    var btn = $('.c-sidebar_toggle'),
        list = $('.c-sidebar_ctr'),
        _bar = $('<span class="c-sidebar_bar"></span><span class="c-sidebar_bar"></span><span class="c-sidebar_bar"></span>'),
        bar = $('.c-sidebar_icon');
    
    _bar.appendTo(bar);

    btn.click(function () {
        $(this).next(list).stop().slideToggle(600).end().toggleClass('is-active');
    });
}

// Page =======================================================================

// Anchor
function commonAnchor() {
    $('.js-anchor').click(function (e) {
        e.preventDefault();
        var thisID = $(this).attr('href');
        $('body, html').animate({ scrollTop: $(thisID).offset().top - 15 }, 600);
    });
}

// send lbx
function sendLbx() {
    var fm = $('.m-fm'),
        btn = $('.js-ctu-send'),
        ctr = $('.js-ctu-lbx'),
        close = $('.js-ctu-close'),
        clr = $('.js-ctu-clear');

    btn.click(function () {
        ctr.addClass('is-show').end();
        fm.find('input, textarea').val('');

        lockScroll();
    });
    close.click(function () { 
        ctr.removeClass('is-show');
        unlockScroll();
    });
    clr.click(function () { fm.find('input, textarea').val(''); });
}

var readyFunction = {
    checkFunction: function checkFunction() {
        this
        //共用函數呼叫
        readyFunction.common();

        //擷取body id
        var functionName = $body.data('id');

        // console.log(functionName);
        if (functionName !== undefined) {
            $body.addClass(functionName);
            //呼叫函數( 如果 id = home 輸出的結果為 readyFunction.home(); )
            eval("readyFunction." + functionName + "();");
        }
    },
    common: function () {
        menu();
        mdEdit('.m-edit');
        aosFn();
        clickFn.gotop('.ft_gotop', '.m-btn--gotop');
        clickFn.other();

        // commonAnchor();
    },
    index: function () {
        swp.index();
        AOS.refresh();
    },
    about: function () {  },
    products: function () {  },
    productsList: function () {
        sidebarFn();
    },
    productsDetail: function () {
        swp.prod();
    },
    product: function () {  },
    partner: function () {  },
    contact: function () {
        sendLbx();
    },
};
$(function () {
    readyFunction.checkFunction();
});