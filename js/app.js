let nodes = new NodeCollection();
let connections = new ConnectionCollection();
let partialConnection;

let chart = new Chart();

nodeContextOptions = [
    new ContextOption('Add connection', function (e) {
        chart.startConnection(ContextMenu.selectedNode);
    }),
    new ContextOption('Rename', function (e) {
        chart.renameNode(ContextMenu.selectedNode);
    }),
    new ContextOption('Delete', function (e) {
        chart.removeNode(ContextMenu.selectedNode);
    })
];

canvasContextOptions = [
    new ContextOption('Add node', function (e) {
        chart.addNode(mouse.x, mouse.y);
    }),
    new ContextOption('Add connection', function (e) {
        chart.startConnection(ContextMenu.selectedNode);
    })        
];