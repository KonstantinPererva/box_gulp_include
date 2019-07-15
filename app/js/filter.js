var Filter = function() {
    var self = {
        elemList: [],
        parent: null,

        getSizeBoxes : function (elem) {
            var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
            var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;

            return {
                width: elemWidth,
                height: elemHeight
            };
        },

        getChildrenBoxes: function (elem) {
            return {
                childrenSizes: function () {
                    var ch = [].slice.call(elem.children);

                    return ch.map(function (el) {
                        el.size = self.getSizeBoxes(el);

                        return el;
                    })
                }
            }
        },

        childrenShare: function (piece) {
            self.elemList.forEach(function (elem, index) {
                var textBlock = elem.querySelector('.catalog-filter-link__text');
                var text = textBlock.textContent;
                var textAdd = '';
                var postTextAdd = '';
                var block = null;
                var firstBlock = true;
                var pieceRight = null;

                if (piece) {
                    pieceRight = piece[index];
                }

                var mainElement = pieceRight || elem;

                console.log(piece);
                console.log(pieceRight);
                console.log(mainElement);

                if(!self.parent){
                    self.parent = elem.parent;
                }

                elem.textArr = text.split(' ');

                for (var j = 0; j < elem.textArr.length; j++) {
                    textAdd += elem.textArr[j] + " ";
                    if (j === elem.textArr.length - 1) {
                        block = self.newBlockTrimmingLeft(textAdd);
                        elem.parent.insertBefore(block, mainElement);
                    } else {
                        block = self.newBlockTrimmingRight(textAdd);
                        elem.parent.insertBefore(block, mainElement);
                    }

                    var sizePost = self.getSizeBoxes(block);

                    if (sizePost.height > 21 || sizePost.width + 10 >= elem.widthRemainder) {
                        block.remove();

                        if (firstBlock) {
                            if (sizePost.width + 10 >= elem.widthRemainder) {
                                block = self.newBlockTrimmingRight(postTextAdd.trim());
                                addBlock(block);
                                firstBlock = false;
                                continue;
                            }
                        }

                        if (sizePost.height > 21) {
                            block = self.newBlockTrimmingBoth(postTextAdd.trim());
                            addBlock(block);
                            continue;
                        }

                        function addBlock(block) {
                            elem.parent.insertBefore(block, mainElement);
                            j--;
                            textAdd = '';
                            elem.widthRemainder = elem.parentWidth;
                        }

                    } else {
                        postTextAdd = textAdd;
                    }

                    if (j !== elem.textArr.length - 1) {
                        block.remove();
                    }
                }

                if (pieceRight) {
                    pieceRight.remove();
                    console.log('remove pieceRight');
                } else {
                    elem.remove();
                    console.log('remove elem');
                }
            });
        },

        newBlockTrimmingRight: function(text) {
            var li = document.createElement('li');
            li.classList.add('catalog-filter-item', 'right');
            li.setAttribute('data-filter-piece', 'right');

            var block = document.createElement('span');
            block.classList.add('catalog-filter-link');

            var blockText = document.createElement('span');
            blockText.classList.add('catalog-filter-link__text');

            var trimmingRight = `
                <svg class="catalog-filter-link__trimming catalog-filter-link__trimming_right" width="3" height="21" viewBox="0 0 3 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.5L2.5 0V2.5V5L0 2.5Z" fill="white"/>
                    <path d="M0 6.5L2.5 4V6.5V9L0 6.5Z" fill="white"/>
                    <path d="M0 14.5L2.5 12V14.5V17L0 14.5Z" fill="white"/>
                    <path d="M0 18.5L2.5 16V18.5V21L0 18.5Z" fill="white"/>
                    <path d="M0 10.5L2.5 8V10.5V13L0 10.5Z" fill="white"/>
                </svg>
            `;

            var ico = document.createElement('span');
            ico.innerHTML = trimmingRight;

            blockText.textContent = text;

            block.appendChild(blockText);
            block.appendChild(ico);
            li.appendChild(block);

            return li;
        },

        newBlockTrimmingLeft: function(text) {
            var li = document.createElement('li');
            li.classList.add('catalog-filter-item', 'left');
            li.setAttribute('data-filter-piece', 'left');

            var block = document.createElement('span');
            block.classList.add('catalog-filter-link');

            var blockText = document.createElement('span');
            blockText.classList.add('catalog-filter-link__text');

            var trimmingLeft = `
                <svg class="catalog-filter-link__trimming catalog-filter-link__trimming_left" width="3" height="21" viewBox="0 0 3 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 14.5L4.05312e-06 17L4.05312e-06 14.5V12L2.5 14.5Z" fill="white"/>
                    <path d="M2.5 18.5L4.05312e-06 21L4.05312e-06 18.5V16L2.5 18.5Z" fill="white"/>
                    <path d="M2.5 10.5L4.05312e-06 13L4.05312e-06 10.5V8L2.5 10.5Z" fill="white"/>
                    <path d="M2.5 2.5L4.05312e-06 5L4.05312e-06 2.5V0L2.5 2.5Z" fill="white"/>
                    <path d="M2.5 6.5L4.05312e-06 9L4.05312e-06 6.5V4L2.5 6.5Z" fill="white"/>
                </svg>
            `;

            var ico = document.createElement('span');
            ico.innerHTML = trimmingLeft;

            blockText.textContent = text;

            block.appendChild(blockText);
            block.appendChild(ico);
            li.appendChild(block);

            return li;
        },

        newBlockTrimmingBoth: function(text) {
            var li = document.createElement('li');
            li.classList.add('catalog-filter-item', 'both');
            li.setAttribute('data-filter-piece', 'both');

            var block = document.createElement('span');
            block.classList.add('catalog-filter-link');

            var blockText = document.createElement('span');
            blockText.classList.add('catalog-filter-link__text');

            var trimmingRight = `
                <svg class="catalog-filter-link__trimming catalog-filter-link__trimming_right" width="3" height="21" viewBox="0 0 3 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2.5L2.5 0V2.5V5L0 2.5Z" fill="white"/>
                    <path d="M0 6.5L2.5 4V6.5V9L0 6.5Z" fill="white"/>
                    <path d="M0 14.5L2.5 12V14.5V17L0 14.5Z" fill="white"/>
                    <path d="M0 18.5L2.5 16V18.5V21L0 18.5Z" fill="white"/>
                    <path d="M0 10.5L2.5 8V10.5V13L0 10.5Z" fill="white"/>
                </svg>
            `;

            var trimmingLeft = `
                <svg class="catalog-filter-link__trimming catalog-filter-link__trimming_left" width="3" height="21" viewBox="0 0 3 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 14.5L4.05312e-06 17L4.05312e-06 14.5V12L2.5 14.5Z" fill="white"/>
                    <path d="M2.5 18.5L4.05312e-06 21L4.05312e-06 18.5V16L2.5 18.5Z" fill="white"/>
                    <path d="M2.5 10.5L4.05312e-06 13L4.05312e-06 10.5V8L2.5 10.5Z" fill="white"/>
                    <path d="M2.5 2.5L4.05312e-06 5L4.05312e-06 2.5V0L2.5 2.5Z" fill="white"/>
                    <path d="M2.5 6.5L4.05312e-06 9L4.05312e-06 6.5V4L2.5 6.5Z" fill="white"/>
                </svg>
            `;

            var ico = document.createElement('span');
            ico.innerHTML = trimmingLeft + trimmingRight;

            blockText.textContent = text;

            block.appendChild(blockText);
            block.appendChild(ico);
            li.appendChild(block);

            return li;
        },

        counterWidth: function (elem) {
            var ch = self.getChildrenBoxes(elem).childrenSizes();
            var width = 0;
            var parentWidth = self.getSizeBoxes(elem).width;
            var widthRemainder = parentWidth;

            ch.forEach(function (el) {
                if (width + el.size.width + 10 < parentWidth) {
                    width += el.size.width + 10;
                    widthRemainder = parentWidth - width;
                } else {
                    if (el.size.width + 10 === parentWidth && el.size.height > 21) {
                        el.parent = elem;
                        el.widthRemainder = widthRemainder;
                        el.parentWidth = parentWidth;

                        self.elemList.push(el);
                    }

                    width = 0;
                    widthRemainder = parentWidth;
                }
            });

            self.childrenShare();
        },

        recalculation: function () {
            var piece = document.querySelectorAll('[data-filter-piece]');
            var pieceRight = document.querySelectorAll('[data-filter-piece="right"]');

            [].forEach.call(piece, function (el) {
                if (el.dataset.filterPiece !== 'right') {
                    el.remove();
                }
            });

            console.log('recalculation');

            self.childrenShare();
        }
    };

    return self;
};