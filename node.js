function Node(x, y) {
    this.x = x;
    this.y = y;
    this.title = 'Closed Guard';
    this.titleStyle = 'rgb(0, 0, 0)';
    this.fontSize = 14;
    this.font = this.fontSize + 'px Arial';

    const NODE_WIDTH_DEFAULT = 150;
    const NODE_HEIGHT_DEFAULT = 75;
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

    this.getTextX = function (textWidth) {
        return this.x + (this.width / 2) - (textWidth  /2);
    }
    this.getTextY = function () {
        return this.y + (this.height / 2) + (this.fontSize / 3);
    }
}