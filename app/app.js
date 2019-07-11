(function () {
    var self = this;

// custom filter
    function shareCatalogFilterItem() {
        var filter = new Filter();
        var par = document.querySelector('.catalog-filter-list');
        filter.counterWidth(par);
    }

    shareCatalogFilterItem();

// dropdown box
    if(document.querySelectorAll('[data-container="goods-box"]').length){
        var infoBox = document.querySelectorAll('[data-container="goods-box"]');

        [].forEach.call(infoBox, function(el) { new DropdownBox(el); });
    }

    function stateFilterBox() {
        if(document.querySelectorAll('[data-container="filter-box"]').length){
            var infoBox = document.querySelectorAll('[data-container="filter-box"]');

            [].forEach.call(infoBox, function(el) {
                new DropdownBox(el,{
                    accordionParent: '[data-group="filter-box"]',
                    onOpen:  function () {
                        var filter = new Filter();
                        var par = document.querySelector('.catalog-filter-list');
                        filter.counterWidth(par);
                    }
                });
            });
        }
    }

    stateFilterBox();

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


// swiper
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

// detail
    if (document.querySelectorAll('.table-body .table-row').length){
        var rows = document.querySelectorAll('.table-body .table-row');

        [].forEach.call(rows, function(row) {
            row.addEventListener('dblclick', function () {
                var detail = new ContainerDetail(document.querySelector('[data-container="detail"]'));
                detail.open();
                initSliderDetailGallery();
            });
        });
    }
})()
