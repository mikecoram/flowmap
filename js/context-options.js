class ContextOptions {
    constructor (chart, contextMenu) {
        this.node = [
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

        this.connection = [
            new ContextOption('Delete', function (e) {
                chart.removeConnection(contextMenu.selectedConnection);
            })
        ]
        
        this.canvas = [
            new ContextOption('Add node', function (e) {
                chart.addNode(mouse.x, mouse.y);
            }),
        ];
    }
}

