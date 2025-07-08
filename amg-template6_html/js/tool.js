/*  Tool ============================================================ */
// judge IE
function browserIE() {
    var browser = navigator.userAgent;
    var browserVerify = browser.toLowerCase().match(/rv:([\d.]+)\) like gecko/);
    var bie = browserVerify;
    // console.log('ans: ' + bie);

    if (bie != null){
        $('body').addClass('is-ie11');
    }

    return bie;
}

function reloadPage() {
    //因架構變化，resize trigger reload
    var wW = $(window).width();
    var trigger_size = [575, 768, 992, 1024, 1200, 1366, 1440, 1680];
    $(window).resize(function () {
        trigger_size.forEach(function (ele) {
            if (wW > ele) {
                $(window).width() <= ele ? location.reload() : "";
            } else {
                $(window).width() > ele ? location.reload() : "";
            }
        });
    });
}

// dataFun
var dataFun = {
    href: function () {
        $('[data-href]').click(function () {
            var href = $(this).data('href');
            location.href = href;
        });
    },
    open: function () {
        $('[data-open]').click(function () {
            var href = $(this).data('open');
            window.open(href);
        });
    },
    bg: function () {
        $('[data-bg]').each(function () {
            var _src = $(this).data('bg');
            $(this).css('background-image', 'url(\'' + _src + '\')');
        });
    },
    imgfix: function () {
        $('[data-imgfix]').each(function () {
            var $this = $(this),
                $img = $this.find('img'),
                _data = $img.data('src'),
                _src = $img.attr('src');

            if (_data != undefined) { _src = _data }
            $img.wrap('<div class="is-imgfix" style="background-image: url(\'' + _src + '\');"></div>');
            // console.log(_src)

        });
    },
    all: function () {
        this.href();
        this.open();
        this.bg();
        this.imgfix();
    }
}

// change svg
function svg() {
    $('img[src$=".svg"].js-svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest   
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG   
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG   
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org   
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.   
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG   
            $img.replaceWith($svg);

        }, 'xml');

    });
}

// Click
var ck = {
    bnScroll: function (ele, tag, repair) {
        var _repair = repair;

        if (_repair == undefined) {
            _repair = 0;
        }

        if ($(window).width() > 1200) {
            _repair = 90;

            scrollFn(ele, tag, _repair);
        } else {
            _repair = 55;

            scrollFn(ele, tag, _repair);
        }

        function scrollFn(a, b, c) {
            $(a).click(function () {
                var thisID = b;
                $('body,html').animate({ scrollTop: $(thisID).offset().top - c }, 600);
            });
        }
    },
    gotop: function (bk, btn) {

        $(window).scroll(function () {

            var threshold = $(document).height() - $(window).height() - $('footer').height();

            if ($(window).scrollTop() > 0) {
                $(bk).addClass('is-show');

                if ($(window).scrollTop() >= threshold) {
                    $(bk).removeClass('is-move');
                } else {
                    $(bk).addClass('is-move');
                }
            } else {
                $(bk).removeClass('is-show');
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
}

// clear sylte
function clearStyle(ele) {
    $(ele).attr('style', '');
}

// Edit
function mdEdit(ele) {
    var el = $(ele);
    
    el.find('table').wrap('<div class="u-scroll-x"></div>');
    el.find('iframe[src*="youtube"]').wrap('<div class="u-yt"></div>')
}

$(document).ready(function () {
    browserIE();
    reloadPage();
    dataFun.all();
    svg();
});
