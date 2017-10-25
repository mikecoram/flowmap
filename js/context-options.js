class ContextOptions {
    constructor (chart, contextMenu) {
        this.node = [
            new ContextOption('Add connection', function (e) {
                chart.startConnection(contextMenu.selected);
            }),
            new ContextOption('Rename', function (e) {
                chart.renameNode(contextMenu.selected);
            }),
            new ContextOption('Delete', function (e) {
                chart.removeNode(contextMenu.selected);
            })
        ];

        this.connection = [
            new ContextOption('Delete', function (e) {
                chart.removeConnection(contextMenu.selected);
            })
        ]
        
        this.canvas = [
            new ContextOption('Add node', function (e) {
                chart.addNode(mouse.x, mouse.y);
            }),
            new ContextOption('Get JSON', function (e) {
                chart.getJSON();
            }),
            new ContextOption('Load JSON', function (e) {
                chart.loadJSON();
            })
        ];
    }
}

