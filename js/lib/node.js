const NODE_WIDTH_DEFAULT = 150;
const NODE_HEIGHT_DEFAULT = 75;

class Node {
    constructor(title, x, y) {
        this.x = x;
        this.y = y;
        this.title = title;
        this.titleStyle = 'rgb(0, 0, 0)';
        this.fontSize = 14;
        this.font = this.fontSize + 'px Arial';

        this.width = NODE_WIDTH_DEFAULT;
        this.height = NODE_HEIGHT_DEFAULT;
        this.selected = false;
    }

    toggleSelected () {
        if (this.selected) this.selected = false;
        else this.selected = true;
    }

    inXBounds (x) {
        return x >= this.x && x <= this.x + this.width;
    }
    inYBounds (y) {
        return y >= this.y && y <= this.y + this.height;
    }
    inBounds (x, y) {
        return this.inXBounds(x) && this.inYBounds(y);
    }

    getTextX (textWidth) {
        return this.x + (this.width / 2) - (textWidth  /2);
    }
    getTextY () {
        return this.y + (this.height / 2) + (this.fontSize / 3);
    }

    draw (ctx) {
        // outline
        ctx.strokeStyle = this.selected ? 'rgb(0, 255, 255)' : 'rgb(255, 0, 0)';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    
        // fill
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    
        // text
        ctx.font= this.font;
        ctx.fillStyle = this.titleStyle;
        ctx.fillText(this.title, this.getTextX(ctx.measureText(this.title).width), this.getTextY());
    }
}