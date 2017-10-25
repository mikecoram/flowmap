class NodeCollection extends Array {
    constructor() {
        super();
        this.currentId = 0;
    }

    insert (node) {
        node.id = this.currentId++;
        this.push(node);
    }

    delete (node, connections) {
        // delete connections
        connections.deleteRelatedToNode(node);

        let i = this.indexOf(node);
        this.splice(i, 1);
    }
}