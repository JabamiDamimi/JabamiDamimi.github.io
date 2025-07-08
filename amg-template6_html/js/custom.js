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
        var idxBn = new Swiper('.m-bn_swp', {
            spaceBetween: 0,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            speed: 2000,
            effect: 'fade',
            // loop: true,
            // fadeEffect: {
            //     crossFade: true,
            // },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
        });

        var idxCls = new Swiper('.idx-class_swp', {
            spaceBetween: 30,
            slidesPerView: 3,
            speed: 1000,
            navigation: {
                nextEl: '.idx-class .js-btn-next',
                prevEl: '.idx-class .js-btn-prev'
            },
            breakpoints: {
                1366: {
                    slidesPerView: 3,
                },
                1024: {
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

        var idxRpro = new Swiper('.idx-rpro_swp', {
            spaceBetween: 14,
            slidesPerView: 4,
            navigation: {
                nextEl: '.idx-rpro .js-btn-next',
                prevEl: '.idx-rpro .js-btn-prev'
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                },
                575: {
                    slidesPerView: 2,
                },
                480: {
                    slidesPerView: 1
                }
            }
        });

        var idxCate = new Swiper('.idx-cate_swp', {
            // spaceBetween: 145,
            spaceBetween: 15,
            slidesPerView: 6,
            navigation: {
                nextEl: '.idx-cate .js-btn-next',
                prevEl: '.idx-cate .js-btn-prev'
            },
            breakpoints: {
                1200: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 3,
                },
                575: {
                    slidesPerView: 2,
                },
                480: {
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
        var list = new Swiper('.prod-show_pic-list', {
            spaceBetween: 10,
            slidesPerView: 4,
            speed: 1000,
            // navigation: {
            //     nextEl: '.prod-data_swp-opt .js-swp-next',
            //     prevEl: '.prod-data_swp-opt .js-swp-prev'
            // },
            breakpoints: {
                480: {
                    slidesPerView: 3,
                },
            }
        });

        var main = new Swiper('.prod-show_pic-main', {
            spaceBetween: 0,
            slidesPerView: 1,
            speed: 1000,
            thumbs: {
                swiper: list
            }
        });
    },
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
        dropdown: function () {
            var item = $('.menu_item'),
                list = $('.dropdown'),
                btn = $('<div class="dropdown-toggle"></div>');

            // 判斷是否有dropdown
            list.parent(item).addClass('is-dropdown');

            // 建立Toggle
            list.before(btn);

            $('.dropdown-toggle').click(function () {
                $(this).next('.dropdown').stop().slideToggle(800);
                $(this).toggleClass('is-active');
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
            this.dropdown();
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

//  search Lightbox
function searchLbx() {
    var open = $('.js-search-open'),
        close = $('.js-search-close'),
        lbx = $('.hd-search');

    open.click(function () { 
        lbx.addClass('is-show'); 
        lockScroll();
    });

    close.click(function () { 
        lbx.removeClass('is-show'); 
        unlockScroll();
    });

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
}

// Side
var sideFn = {
    toggle: function () {
        var _btn = $('.c-side_hamburger'),
            _ctr = $('.c-side_ctr');
        _btn.click(function () {
            $(this).toggleClass('is-active');
            _ctr.stop().slideToggle(600);
        });
    },
    list: function () {
        var _list = $('.c-side_ul'),
            _toggle = $('.c-side_toggle'),
            _btn = $('<div class="js-menu"></div');

        $('.c-side_toggle.is-active').next(_list).stop().slideDown(600);

        _list.prev(_toggle).append(_btn);

        $('.js-menu').click(function () {
            var _this = $(this),
                judge = _this.parent(_toggle).next(_list).is(':visible');
            if (!judge) {
                _list.stop().slideUp(600);
                _toggle.removeClass('is-active');
            }
            _this.parent(_toggle).next(_list).stop().slideToggle(600).end().toggleClass('is-active');
        });
    },
    setting: function () {
        this.toggle();
        this.list();
    }
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
        sideFn.setting();
        mdEdit('.m-edit');
        aosFn();
        clickFn.gotop('.ft_gotop', '.m-btn--gotop');
        clickFn.back('.js-back');
        searchLbx();

        // commonAnchor();
    },
    index: function () {
        swp.index();
        AOS.refresh();
    },
    about: function () {  },
    products: function () {  },
    productsDetail: function () {
        swp.prod();
        // AOS.refresh();
    },
    news: function () {  },
    new: function () {  },
    search: function () {  },
    contact: function () {
        sendLbx();
    },
};
$(function () {
    readyFunction.checkFunction();
});