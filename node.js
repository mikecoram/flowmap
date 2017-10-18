function Node(x, y) {
    this.x = x;
    this.y = y;

    const NODE_WIDTH_DEFAULT = 100;
    const NODE_HEIGHT_DEFAULT = 50;
    this.width = NODE_WIDTH_DEFAULT;
    this.height = NODE_HEIGHT_DEFAULT;

    this.selected = false;
    this.toggleSelected = function () {
        if (this.selected) this.selected = false;
        else this.selected = true;
    }

    this.inXBounds = function (x) {
        return x >= this.x && x <= this.x + this.width;
    }
    this.inYBounds = function (y) {
        return y >= this.y && y <= this.y + this.height;
    }
    this.inBounds = function (x, y) {
        return this.inXBounds(x) && this.inYBounds(y);
    }
}