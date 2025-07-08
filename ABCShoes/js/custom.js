'use strict';

// mobile Size
var rwdw = 1100;

// 是否不是正在滾動

var notscrolling = true;

// 檢查是否為移動裝置 *********************************************************

function mobile() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var device = isAndroid || isiOS;
    return device;
}

// 判斷是否為 IE **************************************************************
function browser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器 
    // var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
    var isIE = window.ActiveXObject || "ActiveXObject" in window;
    // var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器 
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器 
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器 
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && !isEdge; //判断Chrome浏览器 

    var bie = false;

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (userAgent.indexOf('MSIE 6.0') != -1) {
            bie = true;
            return bie;
        } else if (fIEVersion == 7) {
            bie = true;
            return bie;
        } else if (fIEVersion == 8) {
            bie = true;
            return bie;
        } else if (fIEVersion == 9) {
            bie = true;
            return bie;
        } else if (fIEVersion == 10) {
            bie = true;
            return bie;
        } else if (userAgent.toLowerCase().match(/rv:([\d.]+)\) like gecko/)) {
            bie = true;
            return bie;
        } else {
            bie = true;
            return bie;
        } //IE版本过低
    } //isIE end 

    if (isFF) {
        bie = false;
        return bie;
    }
    if (isOpera) {
        bie = false;
        return bie;
    }
    if (isSafari) {
        bie = false;
        return bie;
    }
    if (isChrome) {
        bie = false;
        return bie;
    }
    if (isEdge) {
        bie = true;
        return bie;
    }
}

// 計算視窗 scrollBar *********************************************************
function scrollBarW() {
    /*算出scrollBar寬度*/
    var a = window.innerWidth,
        b = document.documentElement.clientWidth;
    return a - b;
};

// 計算視窗寬度 ***************************************************************
function deviceWidth() {
    var width = $(window).width();
    return width;
}

// 鎖scrollBar ****************************************************************
function lockScroll() {
    var checkDevice = mobile();
    var body = document.body,
        html = document.documentElement,
        checkBar = scrollBarW(),
        scrollBar = checkBar + 'px';
    var distance = -(html.scrollTop + body.scrollTop);
    if (checkDevice === false) {
        if (checkBar != 0) {
            //pc
            body.style.paddingRight = scrollBar;
            // body.style.overflowY = 'hidden';
        } else {
            //pc(safari)
            body.style.paddingRight = '';
            // body.style.overflowY = 'hidden';
        }
    } else {
            //行動裝置
            // $('body').css({
            //     'top': distance
            // })
            // body.style.position = 'fixed';
            // body.style.width = '100%';
            // body.style.height = '100%';
        }
    return distance;
};

// 解scrollBar **************************************************************
function unlockScroll() {
    // document.body.style.position = '';
    // document.body.style.overflow = '';
    // document.body.style.width = '';
    // document.body.style.height = '';
    document.body.style.paddingRight = '';
    // document.body.style.top = '';
    // $('.menu-main').removeAttr('style');
    // $('.menu-news').removeAttr('style');
};

// Ajax lightBox **************************************************************
function active_lbox() {
    var lbox_switch = $('.ajax_open');
    lbox_switch.on('click', function () {
        var a = $(this).attr('data-page');
        var b = $(this).attr('data-id');
        var c = $(this).attr('video-id');
        lbox(a, b, c);
    });
};

// 啟動lightbox
function lbox(lbox_page, lbox_id, video_id) {
    $.ajax({
        url: lbox_page
    }).done(function (data) {
        $("body").append("<article class='lbox " + lbox_id + "' data-id=" + lbox_id + "></article>").addClass('js-lboxOpen');

        lockScroll();

        var injectTarget = '.lbox.' + lbox_id;
        $(injectTarget).html(data);
        lbox_function(lbox_id, video_id);
        /*給燈箱一個 open 讓動畫作動*/
        if ($(injectTarget).length > 0) {
            setTimeout(function () {
                $(injectTarget).addClass('js-open');
            }, 500);
        }
    });
};

function lbox_function(id, video_id) {
    switch (id) {
        case 'lbox-video':
            $('.lbox-video iframe').attr({
                'src': 'https://www.youtube.com/embed/' + video_id + '?rel=0&autoplay=1'
            });
            lbox_close(id, 500);
            break;

        case 'member-upl-pic':
            click.member_lbox();
            lbox_close(id, 500);
            break;
        case 'csr-lb':
            //csr-lb 燈箱
            console.log('13579');
            setTimeout(function () {
                $('.map-list').addClass('in');
            }, 800);
            // features.csr_page()
            lbox_close(id, 1000);
            break;

        default:
            lbox_close(id, 500);
            break;
    }
};

function lbox_close(id, time) {
    var closeBtn = '.lbox.' + id;
    var ajaxCloseBtn = $(closeBtn).find('.ajax_close');
    ajaxCloseBtn.on('click', function () {
        var _this = $(this),
            targetPage = _this.closest('.lbox');
        targetPage.removeClass('js-open').addClass('js-close');
        $('body').removeClass('js-lboxOpen');
        unlockScroll();

        setTimeout(function () {
            targetPage.remove();
        }, time);
    });
}

/***************************************************************************************************************************/

// Select *********************************************************************
function select() {
    $('.select .st-btn').on("click", function () {
        $(this).siblings('ul').slideToggle().end().toggleClass('open');
    }).siblings('ul').hide();
}

// Menu ***********************************************************************
function headerMenu() {
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

    $(window).resize(function () {
        mobile();
    });

    // PC & Mobile Clear, Move ( lang & Inquiry )
    function mobile() {

        if (menuBtn.is(':hidden')) {

            // PC Visible

            $('.menu, .menu-lists').attr('style', '');
            menuBtn.removeClass('open');
            $('header').removeClass('menuOpen');
        } else {

            // Mobile Visible

        }
    }
    // Mobile MenuButton
    menuBtn.click(function () {
        $(this).next('.menu').slideToggle(800).end().toggleClass('open');
        $('header').toggleClass('menuOpen'); //控制底色
    });

    //PC Hover
    menuDropDown.hover(function () {
        if (menuBtn.is(':hidden')) {
            $(this).find(menuLists).stop().fadeToggle();
        }
    });

    //Moblie SubMenu Button
    $('.menu-fold').click(function () {
        $(this).next(menuLists).stop().slideToggle().end().toggleClass('open');
    });
}

function proSubMenu() {
    $('.pro-menu-switch').click(function () {
        $(this).next('.pro-menu-list').stop().slideToggle().end().toggleClass('open');
    });
    mobile();
    $(window).resize(function () {
        mobile();
    });
    function mobile() {

        if ($('.menu-btn').is(':hidden')) {

            $('.pro-menu-switch').removeClass('open');
            $('.pro-menu-list').attr('style', '');
        }
    }
}

// Faq ************************************************************************
function faq(ask, ans) {
    $(ask).click(function () {
        $(this).next(ans).stop().slideToggle().end().toggleClass('js-open');
    }).next(ans).hide();
}

/* Swiper ===================================================================== */
var swiper = {
    home: function home() {
        var idx_banner = new Swiper('.swp-idx-bn', {
            spaceBetween: 0,
            autoplay: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });

        var idx_proList = new Swiper('.swp-proList', {
            slidesPerView: 4,
            slidesPerColumn: 2,
            spaceBetween: 40,
            navigation: {
                nextEl: '.btn-next',
                prevEl: '.btn-prev'
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                    slidesPerColumn: 2
                    // simulateTouch: true,
                },
                480: {
                    slidesPerView: 1,
                    slidesPerColumn: 2
                }
            }
        });
    },
    product: function product() {
        var pro_ad = new Swiper('.swp-pro-ad', {
            spaceBetween: 0,
            autoplay: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    },
    shoppingcart: function shoppingcart() {
        var shp_ad = new Swiper('.shp-recommend-owl', {
            slidesPerView: 4,
            spaceBetween: 30,
            breakpoints: {
                1440: {
                    slidesPerView: 3
                    // simulateTouch: true,
                },
                480: {
                    slidesPerView: 1
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
    }
};

/* Scroll ===================================================================== */
var scrollBar = {
    common: function common(cls) {
        $(window).scroll(function (event) {
            var threshold = $(document).height() - $(window).height() - $('footer').height();
            if ($(window).scrollTop() > threshold) {
                $(cls).stop().fadeOut(400);
                return;
            }
            $(cls).stop().fadeIn(400);
        });
    },
    news: function news(cls) {
        $(window).scroll(function (event) {
            var threshold = $(document).height() - $(window).height() - $('.page-btn').height();
            if ($(window).scrollTop() > threshold) {
                var this_w = $(window).width();
                if (this_w > 993) {
                    $(cls).stop().fadeOut(400);
                    return;
                }
            }
            $(cls).stop().fadeIn(400);
        });
    },
    pro: function pro() {
        $(window).scroll(function (event) {
            if ($(window).scrollTop() > 0) {
                $('header').addClass('js-move');
            } else {
                $('header').removeClass('js-move');
            }
        });
    }

    /* Click ********************************************************************** */
};var click = {
    back: function back(cls) {
        $(cls).on('click', function () {
            window.history.back();return;
        });
    },
    pageback: function pageback(cls) {
        //獲取上一頁url
        var webUrl = document.referrer;
        // 判斷上一頁是否為本站
        $(cls).on('click', function () {
            if (webUrl.indexOf('ITE') > -1) {
                window.history.back();return;
            }
            window.location = "http://xwadex.com/_awad_/ITE/@www/views/news/";
        });
    },
    anchor: function anchor(cls, dev) {
        $(cls).click(function () {
            event.preventDefault();

            if (dev == undefined) {
                deviation = 0;
            } else {
                deviation = dev;
            }

            var thisID = $(this).attr('href');
            $('body,html').animate({ scrollTop: $(thisID).offset().top - deviation }, 600);
        });
    },
    dropDown: function dropDown(cls, tag, ef) {
        $(cls).click(function () {
            var sw = 0;

            $(this).toggleClass('js-open');

            if (ef === 'fade') {
                $(tag).stop().fadeToggle();
            } else if (ef === 'slide') {
                $(tag).stop().slideToggle();
            } else {
                $(tag).stop().toggleClass('js-open');
            }
        });
    },
    goTop: function goTop(cls) {
        $(cls).on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 1000, 'swing');
        });
    },
    member_lbox: function member_lbox() {
        $('.member-upl-pic .btn-agree').click(function () {
            $(this).parents('.lbox-container').addClass('js-hide');
            $('.member-upl-pic').find('.lbox-container--agree').addClass('js-show');
        });
    }
};

var clickCustom = {
    pro_list_dropDown: function pro_list_dropDown() {
        $('.btn-guide').click(function () {

            $(this).toggleClass('js-open');

            if ($(window).width() > rwdw) {
                $('.prol-guide__content').stop().fadeToggle();
            } else {
                $(this).parents('.prol-guide').toggleClass('js-open');
                $('.prol-guide__content').toggleClass('js-open').stop().fadeToggle();
            }
        });
    },
    sidebar_basis: function sidebar_basis() {
        $('.sidebar-basis__head').click(function () {
            $(this).next('.sidebar-basis__body').stop().slideToggle();
        });
        rwdRe();
        function rwdRe() {
            $(window).resize(function () {
                if ($(window).width() > rwdw) {
                    $('.sidebar-basis__body').attr('style', '');
                }
            });
        }
    }
    /* Common Link **************************************************************** */
};function commonlink() {
    // js link
    var href = $('.js-a-href');
    href.click(function () {
        var data = $(this).data('href');
        location.href = data;
    });

    // js back
    var back = $('.js-a-back');
    back.click(function () {
        history.back();
    });
}
/* ie11 相容 ****************************************************************** */
function ieCss() {
    var thisBrowser = browser();

    if (thisBrowser) {
        $('body').addClass('js-ie');
    }
}

/* ReSize ===================================================================== */
var reRwd = {
    home: function home() {
        $(window).resize(function () {});
    }

    /* 呼叫 ======================================================================= */
};var readyFunction = {
    checkFunction: function checkFunction() {
        this;
        //共用函數呼叫
        readyFunction.common();

        //擷取body id
        var functionName = $('body').data('id');
        // console.log(functionName);
        if (functionName !== undefined) {
            //呼叫函數( 如果 id = home 輸出的結果為 readyFunction.home(); )
            eval("readyFunction." + functionName + "();");
        }
    },
    common: function common() {
        active_lbox();
        headerMenu();
        ieCss();
        commonlink();
        // scrollBar.common('.bothMenu');
    },
    home: function home() {
        swiper.home();
    },
    about: function about() {},
    news: function news() {},
    news_detail: function news_detail() {},
    product: function product() {
        swiper.product();
        proSubMenu();
    },
    pro_list: function pro_list() {},
    faq: function faq() {
        clickCustom.sidebar_basis();
        // faq('.faq__ask','.faq__ans');
    },
    search: function search() {},
    member: function member() {},
    mber_join: function mber_join() {},
    mber_correct: function mber_correct() {
        clickCustom.sidebar_basis();
    },
    mber_cort_add: function mber_cort_add() {
        clickCustom.sidebar_basis();
    },
    mber_upload: function mber_upload() {
        clickCustom.sidebar_basis();
    },
    mber_password: function mber_password() {
        clickCustom.sidebar_basis();
    },
    mber_ticket: function mber_ticket() {
        clickCustom.sidebar_basis();
    },
    mber_fav: function mber_fav() {
        clickCustom.sidebar_basis();
    },
    mber_shopping: function mber_shopping() {
        clickCustom.sidebar_basis();
    },
    mber_order: function mber_order() {
        clickCustom.sidebar_basis();
    },
    mber_order_detail: function mber_order_detail() {
        clickCustom.sidebar_basis();
    },
    mber_ask: function mber_ask() {
        clickCustom.sidebar_basis();
    },
    mber_askd: function mber_askd() {
        clickCustom.sidebar_basis();
    },
    mber_rule: function mber_rule() {},
    shoppingcart: function shoppingcart() {
        swiper.shoppingcart();
    },
    contact: function contact() {}
};

$(function () {
    readyFunction.checkFunction();
});