function DropdownBox(node) {
    var self = this;

    self.node = node;
    self.btn = self.node.querySelector('[data-button]');
    self.box = self.node.querySelector('[data-box]');
    self.indicator = self.node.querySelector('[data-indicator]');

    self.toggleOpen = function() {
        $(self.box).slideToggle(200);
        $(self.indicator).toggleClass('open');
    };

    self.btn.addEventListener('click', self.toggleOpen);
}

