let canvas = new FlowMapCanvas('flowmap');
let chart = new Chart(canvas);
let contextMenu = new ContextMenu('context-menu');
let modal = new Modal('input-modal');

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