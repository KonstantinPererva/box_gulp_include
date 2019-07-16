function AddOrder(nodeButton, nodeTab) {
    var self = this;

    self.nodeButton = nodeButton;
    self.nodeTab = nodeTab;

    self.btnAddOrder = document.querySelector('[data-add-order]');

    self.tab = self.nodeTab.querySelectorAll('[data-tab]');

    self.btnOrder = self.nodeButton.querySelectorAll('[data-button]');

    self.viewTab = function () {
        [].forEach.call(self.btnOrder, function (btn) {
            btn.addEventListener('click', function () {
                var id = this.dataset.id;
                self.activeButton(this);
                self.activeTab(id);
            })
        });
    };

    self.btnAddOrder.addEventListener('click', function () {
        if(self.btnOrder.length < 5) {
            self.createButton();
            self.createTab();

            self.btnOrder = self.nodeButton.querySelectorAll('[data-button]');
            self.tab = self.nodeTab.querySelectorAll('[data-tab]');

            self.viewTab();
        }
    });

    self.activeButton = function (el) {
        [].forEach.call(self.btnOrder, function (btn) {
            btn.classList.remove('active');
            el.classList.add('active');
        });
    };

    self.activeTab = function (id) {
        [].forEach.call(self.tab, function (tab) {
            if (tab.dataset.id === id) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    };

    self.createButton = function() {
        [].forEach.call(self.btnOrder, function (btn) {
            btn.classList.remove('active');
        });

        var item = document.createElement('li');
        item.classList.add('catalog-order-button-list-item');

        self.templateButton = `
            <div class="catalog-order-button active" data-button="order" data-id="${self.btnOrder.length}">
              <span class="catalog-order-button__text">Заказ ${self.btnOrder.length + 1}</span>
    
              <button class="catalog-order-button-remove">
                <svg viewBox="0 0 7 7" fill="none" class="catalog-order-button-remove__ico" height="8" width="8">
                  <path d="M0.646447 1.35355L5.64645 6.35355L6.35355 5.64645L1.35355 0.646447L0.646447 1.35355ZM5.64645 0.646447L0.646447 5.64645L1.35355 6.35355L6.35355 1.35355L5.64645 0.646447Z" />
                </svg>
              </button>
            </div>
        `;

        item.innerHTML = self.templateButton;
        self.nodeButton.appendChild(item);
    };

    self.createTab = function() {
        [].forEach.call(self.tab, function (tab) {
            tab.classList.remove('active');
        });

        var item = document.createElement('div');
        item.classList.add('catalog-order-tabs__item', 'active');
        item.setAttribute('data-tab', 'order');
        item.setAttribute('data-id', self.tab.length);

        item.innerHTML = self.templateTable;
        self.nodeTab.appendChild(item);
    };

    self.templateTable = `
        <div class="table">
            <div class="table-header">
                <div class="table-header__inner">
                    <div class="table-row">
                        <div class="table-cell table-cell_hr" style="width: 100px;">
                            <div class="table-cell__inner">
                                <span class="table-cell__ico table-cell__ico_sort"></span>
        
                                <span class="table-cell__text table-cell__text_hr">Код</span>
                            </div>
                        </div>
        
                        <div class="table-cell table-cell_hr" style="width: 130px;">
                            <div class="table-cell__inner">
                                <span class="table-cell__ico table-cell__ico_sort"></span>
        
                                <span class="table-cell__text table-cell__text_hr">Каталожный номер</span>
                            </div>
                        </div>
        
                        <div class="table-cell table-cell_hr">
                            <div class="table-cell__inner">
                                <span class="table-cell__ico table-cell__ico_sort"></span>
        
                                <span class="table-cell__text table-cell__text_hr">Наименование</span>
                            </div>
        
                            <div class="table-cell__drag"></div>
                        </div>
        
                        <div class="table-cell table-cell_hr" style="width: 200px;">
                            <div class="table-cell__inner">
                                <span class="table-cell__ico table-cell__ico_sort"></span>
        
                                <span class="table-cell__text table-cell__text_hr">Бренд</span>
                            </div>
                        </div>
        
                        <div class="table-cell table-cell_hr" style="width: 70px;">
                            <div class="table-cell__inner">
                                <span class="table-cell__ico table-cell__ico_sort"></span>
        
                                <span class="table-cell__text table-cell__text_hr">Ед.</span>
                            </div>
                        </div>
        
                        <div class="table-cell table-cell_hr" style="width: 70px;">
                            <div class="table-cell__inner">
                                <span class="table-cell__ico table-cell__ico_sort"></span>
        
                                <span class="table-cell__text table-cell__text_hr">Ост.</span>
                            </div>
                        </div>
        
                        <div class="table-cell table-cell_hr" style="width: 120px;">
                            <div class="table-cell__inner">
                                <span class="table-cell__ico table-cell__ico_sort"></span>
        
                                <span class="table-cell__text table-cell__text_hr">Цена</span>
                            </div>
                        </div>
        
                        <div class="table-cell table-cell_hr" style="width: 70px;">
                            <div class="table-cell__inner">
                                <span class="table-cell__text table-cell__text_hr">Кол-во</span>
                            </div>
                        </div>
        
                        <div class="table-cell table-cell_hr" style="width: 24px;">
                            <div class="table-cell__inner">
                                <span class="table-cell__text table-cell__text_hr"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="table-body table-body_second">
                <div class="table-body__inner">
                    <div class="table-row">
                        <div class="table-cell" style="width: 100px;">
                            <div class="table-cell__inner"></div>
                        </div>
        
                        <div class="table-cell" style="width: 130px;">
                            <div class="table-cell__inner"></div>
                        </div>
        
                        <div class="table-cell">
                            <div class="table-cell__inner"></div>
                        </div>
        
                        <div class="table-cell" style="width: 200px;">
                            <div class="table-cell__inner"></div>
                        </div>
        
                        <div class="table-cell" style="width: 70px;">
                            <div class="table-cell__inner"></div>
                        </div>
        
                        <div class="table-cell" style="width: 70px;">
                            <div class="table-cell__inner"></div>
                        </div>
        
                        <div class="table-cell" style="width: 120px;">
                            <div class="table-cell__inner"></div>
                        </div>
        
                        <div class="table-cell" style="width: 70px;">
                            <div class="table-cell__inner"></div>
                        </div>
        
                        <div class="table-cell" style="width: 24px;">
                            <div class="table-cell__inner"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    self.init = function () {
        self.viewTab();
    };

    self.init();
}