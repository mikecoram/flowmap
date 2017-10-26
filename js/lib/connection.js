class Connection {
    constructor(parentNode, childNode) {
        this.parentNode = parentNode;
        this.childNode = childNode;
        this.selected = false;
    }

    getNodePoint (n) {
        return {
            x: n.x + n.width / 2,
            y: n.y + n.height / 2
        }
    }

    draw (ctx) {
        let pn = this.parentNode;
        let cn = this.childNode;

        ctx.beginPath();
        ctx.moveTo(pn.x + pn.width / 2, pn.y + pn.height / 2);
        ctx.strokeStyle = this.selected ? 'rgb(0, 255, 255)' :'rgb(0, 255, 0)';
        ctx.lineTo(cn.x + cn.width / 2, cn.y + cn.height / 2);
        ctx.stroke();
        ctx.closePath();
    }
}