var TableCellResize = function (table,head) {
    var S = this;

    S.TBody = document.querySelector(table);// Главная таблица
    S.THead = S.TBody.querySelector(head);// Шапка таблицы
    S.ColWidth = [];

    S.Resizers = S.TBody.querySelectorAll('.table-cell__drag'); // Ползунки ресайза таблицы
    S.ResElement = false;
    S.Coord = {};
    S.RowsActive = false;
    S.SortActive = false;
    S.CanUped = true;
    S.Mobile = false;
    S.SWTBody = false;
    S.SWParent = false;
    S.newWidth = false;

    function getSizeBoxes(elem) {
        var elemWidth = elem.getBoundingClientRect().right - elem.getBoundingClientRect().left;
        var elemHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;

        return {
            width: elemWidth,
            height: elemHeight
        };
    }

    [].forEach.call(S.Resizers, function (item) {
        item.addEventListener('mousedown', function (e) {
            if (e.target === item) S.ResElement = item;

            S.Coord.StartX = e.pageX;
            S.SWParent = getSizeBoxes(item.parentNode).width;
            // S.SWTBody = S.TBody.clientWidth;
        });
    });

    document.body.addEventListener('mousemove', function (e) {
        if (!S.ResElement) return;

        S.Coord.X = e.pageX;

        var newWidth = S.SWParent + (S.Coord.X - S.Coord.StartX);

        if (newWidth < 11) return;

        S.ResElement.parentNode.style.width = newWidth + 'px';

        var parent = S.ResElement.parentNode;

        var nextColumn = parent.nextElementSibling;

        var widthSib = getSizeBoxes(nextColumn).width;


        console.log(widthSib);
        // var width = widthSib + (S.newWidth - newWidth);

        // console.log(parent);
        // console.log(nextColumn);


        // nextColumn.style.width = width + 'px';

        // S.TBody.style.width = S.SWTBody + (S.Coord.X - S.Coord.StartX) + 'px';
        // S.THead.style.width = S.SWTBody + (S.Coord.X - S.Coord.StartX) + 'px';

    });

    document.body.addEventListener('mouseup', function (e) {
        S.ResElement = false;
    });
};
