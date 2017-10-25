class JSONConverter {
    constructor () {

    }

    getConnections (collection) {
        let connections = [];
        collection.forEach(function (c) {
            connections.push({
                parentNodeId: c.parentNode.id,
                childNodeId: c.childNode.id
            });
        });
        return connections;
    }

    getJSON (chart) {
        let nodes = chart.nodes;
        let connections = this.getConnections(chart.connections);

        let json =  {
            nodes: chart.nodes,
            connections: connections
        };

        return json;
    }
}

class JSONParser {
    constructor (jsonString) {
        this.json = JSON.parse(jsonString);
        this.get();
    }

    getNodes () {
        let nodes = new NodeCollection();
        this.json.nodes.forEach(function (n) {
            nodes.insert(new Node(n.title, n.x, n.y));
        });
        return nodes;
    }

    getNodeById (id) {
        return this.nodes.find(function (n) { return n.id == id; });
    }

    getConnections () {
        let connections = new ConnectionCollection();
        let scope = this;
        this.json.connections.forEach(function (c) {
            let parentNode = scope.getNodeById(c.parentNodeId);
            let childNode = scope.getNodeById(c.childNodeId);
            connections.insert(new Connection(parentNode, childNode));
        });
        return connections;
    }

    get () {
        this.nodes = this.getNodes();
        this.connections = this.getConnections();
    }

}