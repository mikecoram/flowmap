let nodes = new NodeCollection();
let connections = new ConnectionCollection();
let partialConnection;

nodeContextOptions = [
    new ContextOption('Add connection', function (e) {
        startConnection(ContextMenu.selectedNode);
    }),
    new ContextOption('Rename', function (e) {
        renameNode(ContextMenu.selectedNode);
    }),
    new ContextOption('Delete', function (e) {
        removeNode(ContextMenu.selectedNode);
    })
];

canvasContextOptions = [
    new ContextOption('Add node', function (e) {
        addNode(e.x, e.y);
    }),
    new ContextOption('Add connection', function (e) {
        startConnection(ContextMenu.selectedNode);
    })        
];