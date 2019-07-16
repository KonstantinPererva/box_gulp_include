
// dropdown box
if(document.querySelectorAll('[data-container="goods-box"]').length){
    var infoBox = document.querySelectorAll('[data-container="goods-box"]');

    [].forEach.call(infoBox, function(el) { new DropdownBox(el); });
}

    if(document.querySelectorAll('[data-container="filter-box"]').length){
        var filterBox = document.querySelectorAll('[data-container="filter-box"]');

        [].forEach.call(filterBox, function(el) {
            new DropdownBox(el,{
                accordionParent: '[data-group="filter-box"]',
                // onOpen:  function () {
                //     var par = document.querySelector('.catalog-filter-list');
                //     var filter = new Filter();
                //         filter.counterWidth(par);
                // },
            });
        });
    }

// resize grid page

    var catalogHorizontalResize = new Resizing({
        direction: 'horizontal', //'horizontal' or 'vertical'
        node: '[data-grid="catalog-container"]',
        lever: '[data-grid="catalog-lever-horizontal"]',
        button: '[data-grid="button-toggle"]',
        hide: 'left',
        boxLeft: '[data-grid="catalog-cell-left"]',
        boxRight: '[data-grid="catalog-cell-right"]',
        resizeListener: function () {
            $('[data-box="filter-selected-list"]').slideUp(200);
            $('[data-indicator="filter-title-indicator"]').removeClass('open');
            $('[data-button="filter-title"]').removeClass('open');
        }
    });
    catalogHorizontalResize.init();

    var catalogVerticalLeftBoxResize = new Resizing({
        direction: 'vertical', //'horizontal' or 'vertical'
        node: '[data-grid="catalog-cell-left"]',
        lever: '[data-grid="catalog-lever-vertical-cell-left"]',
        button: '[data-grid="button-toggle"]',
        hide: 'bottom',
        boxTop: '[data-grid="catalog-row-top-cell-left"]',
        boxBottom: '[data-grid="catalog-row-bottom-cell-left"]'
    });
    catalogVerticalLeftBoxResize.init();

    var catalogVerticalRightBoxResize = new Resizing({
        direction: 'vertical', //'horizontal' or 'vertical'
        node: '[data-grid="catalog-cell-right"]',
        lever: '[data-grid="catalog-lever-vertical-cell-right"]',
        button: '[data-grid="button-toggle"]',
        hide: 'bottom',
        boxTop: '[data-grid="catalog-row-top-cell-right"]',
        boxBottom: '[data-grid="catalog-row-bottom-cell-right"]'
    });
    catalogVerticalRightBoxResize.init();

// custom scrollbar
    [].forEach.call(document.querySelectorAll('.table-body'), function(el) { new SimpleBar(el, { autoHide: false, forceVisible: true }); });
    new SimpleBar(document.querySelector('.detail-goods-box-scroll__hold'), { autoHide: false });

    if (document.querySelector('.card-list')) {
        new SimpleBar(document.querySelector('.card-list'), { autoHide: false });
    }


new SimpleBar(document.querySelector('.catalog-menu-list'), { autoHide: false });

new SimpleBar(document.querySelector('.catalog-filter__body'), { autoHide: false });

// swiper detail
    function initSliderDetailGallery() {
        var detailGallery = new Swiper(".goods-gallery",{
            slidesPerView: 1,
            speed: 400,
            spaceBetween: 10,
            navigation: {
                nextEl: '.goods-gallery-navigator__button_next',
                prevEl: '.goods-gallery-navigator__button_prev',
            }
        });
    }

// open detail
var detail = new ContainerDetail(document.querySelector('[data-container="detail"]'));

if (document.querySelectorAll('.table-body .table-row').length){
    var rows = document.querySelectorAll('.table-body .table-row');

    [].forEach.call(rows, function(row) {
        row.addEventListener('dblclick', function () {
            detail.open();
            initSliderDetailGallery();
        });

        row.addEventListener('click', function () {
            [].forEach.call(rows, function (row) {
                row.classList.remove('active');
            });

            this.classList.add('active');
        });
    });
}

$('.card-item-more, .button-goods_photo').click(function () {
    detail.open();
    initSliderDetailGallery();
});

// resize column table
new TableCellResize('.catalog-order-tabs .table', '.catalog-order-tabs .table-header');

    // add order
var order = new AddOrder(
    document.querySelector('[data-container="button-tabs"]'),
    document.querySelector('[data-container="tabs"]')
);

// menu
$('.catalog-menu-link').click(function () {
    if ($(this).siblings().is('.catalog-menu-drop')) {
        $(this).toggleClass('active');
        $(this).siblings('.catalog-menu-drop').slideToggle(300);
    }

    $(this).parent('.catalog-menu-item').siblings('.catalog-menu-item').find('.catalog-menu-link').removeClass('active');
    $(this).parent('.catalog-menu-item').siblings('.catalog-menu-item').find('.catalog-menu-drop').slideUp(300);
});

//filter item
$('.catalog-filter-link').click(function () {
    $(this).toggleClass('selected');
});

// information type
$('.information-type__button').click(function () {
    $('.information-type__button').removeClass('active');
    $(this).addClass('active');
    var view = $(this).attr('data-view');

    if (view === 'table') {
        $('[data-goods="table-list"]').show();
        $('[data-goods="card-list"]').hide();
    } else if (view === 'card') {
        $('[data-goods="card-list"]').show();
        $('[data-goods="table-list"]').hide();
    }
});

$('.historyGmButton').click(function () {
    $('.drop-history').slideToggle(200);
});

