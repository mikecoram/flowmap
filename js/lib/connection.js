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

    inBounds (x, y) {
        let start = getNodePoint(this.parentNode);
        let end = getNodePoint(this.childNode);

    }
}