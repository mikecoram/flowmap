let nodes = new NodeCollection();
let connections = new ConnectionCollection();
let partialConnection;

let chart = new Chart();
let contextMenu = new ContextMenu('context-menu');

nodeContextOptions = [
    new ContextOption('Add connection', function (e) {
        chart.startConnection(contextMenu.selectedNode);
    }),
    new ContextOption('Rename', function (e) {
        chart.renameNode(contextMenu.selectedNode);
    }),
    new ContextOption('Delete', function (e) {
        chart.removeNode(contextMenu.selectedNode);
    })
];

canvasContextOptions = [
    new ContextOption('Add node', function (e) {
        chart.addNode(mouse.x, mouse.y);
    }),
    new ContextOption('Add connection', function (e) {
        chart.startConnection(contextMenu.selectedNode);
    })        
];