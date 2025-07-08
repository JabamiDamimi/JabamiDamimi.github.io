$(function () {
    // 設定menu list
    var menuArry = [{
            name: 'Getting Started 入門',
            link: 'setting'
        },
        {
            name: 'Helpers 助手',
            link: 'helpers'
        },
        {
            name: 'Module 模組',
            link: 'module'
        },
        {
            name: 'Download 下載',
            link: 'download'
        }
    ]

    // 基礎設定 header & footer
    var header = $('<div class="elhd_l-wp l-wp-1680"><div class="elhd_logo">Atomic Design</div><div class="elhd_toggle"></div><div class="elmenu"><ul class="elmenu__ctr"></ul></div></div>'),
        footer = $('<div class="elft_l-wp l-wp-1680"><div class="elcopyright">Copyright©  2019 - All. <span> Design by </span></div></div>');
    // $('header').append(header);
    $('footer.elft').append(footer);

    // 建立MENU List
    // $.each(menuArry, function (i, val) { 
    //     var list = $('<li class="menu_item" data-open="' + val.link + '.html">' + val.name + '</li>');
    //     $('.menu_ctr').append(list);
    // });

    function menu() {
        var btn = $('.elhd_toggle');
        btn.click(function () {
            $(this).parents('header.elhd').toggleClass('is-active')
        });
    }
    menu();

    function openPage() {
        var ctrIr = $('.elbody-ir'),
            ctrStn = $('.elstn-body'),
            ctrClose = $('.elbody-close')

        $('.elmenu_item').click(function () {
            $('header.elhd').removeClass('is-active');

            var thisOpen = $(this).data('import');
            var inner = $('<iframe src="' + thisOpen + '" frameborder="0"></iframe>')
            ctrIr.stop(false, true).fadeOut(500);
            setTimeout(function () {
                ctrIr.html(inner).stop(false, true).fadeIn(1000);
            }, 500);

            ctrStn.addClass('is-show');
        });

        ctrClose.click(function () {
            ctrStn.removeClass('is-show');
        });
    }
    openPage();

});