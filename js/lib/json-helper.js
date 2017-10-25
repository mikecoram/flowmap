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
    constructor (json) {
        this.json = json;
    }

    addNodeObjectReferences () {

    }

    getConnections () {
        
    }
}