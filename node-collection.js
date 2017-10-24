class NodeCollection extends Array {
    constructor() {
        super();
    }

    delete(node, connections) {
        // delete connections
        connections.deleteRelatedToNode(node);

        let i = this.indexOf(node);
        this.splice(i, 1);

        console.log(connections, nodes)
    }
}