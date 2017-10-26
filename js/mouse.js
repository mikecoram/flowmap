const MOUSE_BUTTON = { LEFT: 0, RIGHT: 1 };
const MOUSE_STATE = { UP: 'up', DOWN: 'down' };
const MOUSE_OPERATION = { NONE:'none', DRAWING_CONNECTION: 'drawing-connection' };

class Mouse {
    constructor () {
        this.x = 0;
        this.y = 0;
        this.state = MOUSE_STATE.UP;
        this.operation = MOUSE_OPERATION.NONE;
        
        // stores distance from top left of selected node so that the node can be drawn in the correct position
        this.offset = {
            x:0, 
            y:0
        };
    
        this.dragNode = undefined;
        this.selectedNode = undefined;
        this.selectedConnection = undefined;
    }

    displayinfoPanel (node) {
        if (node)
            this.infoPanel.displayNode(this.selectedNode);
    }

    selectNode (node) {
        this.selectedNode = node;
        this.selectedNode.selected = true;

        this.displayinfoPanel(node);
    }

    selectConnection (connection) {
        this.selectedConnection = connection;
        this.selectedConnection.selected = true;

        this.displayinfoPanel();
    }

    resetNodeSelection () {
        if (this.selectedNode) {
            this.selectedNode.selected = false;
            this.selectedNode = undefined;
        }
    }

    resetConnectionSelection () {
        if (this.selectedConnection) {
            this.selectedConnection.selected = false;
            this.selectedConnection = undefined;
        }
    }

    resetSelection () {
        this.resetNodeSelection();
        this.resetConnectionSelection();
        this.infoPanel.clear();
    }

    update(canvas, e) {
        let rect = canvas.docCanvas.getBoundingClientRect();
        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;
    }

    getNodeUnderCursor (chart) {
        for (let i = 0; i < chart.nodes.length; i++) {
            let node = chart.nodes[i];
            if (node.inBounds(this.x, this.y)) {
                return node;
            }
        }
        return false;
    }

    getConnectionUnderCursor (chart) {
        for (let i = 0; i < chart.connections.length; i++) {
            let connection = chart.connections[i];

            let ctx = chart.canvas.context;
            let pn = connection.parentNode;
            let cn = connection.childNode;
            let lineWidth = 20;
    
            let dh = new DrawingHelper();
            let x1 = pn.x + pn.width / 2;
            let y1 = pn.y + pn.height / 2;
            let x2 = cn.x + cn.width / 2;
            let y2 = cn.y + cn.height / 2;
            
            let rect =  dh.defineLineAsRect(x1, y1, x2, y2, lineWidth);
            dh.drawLineAsRect(ctx, rect);    

            if (ctx.isPointInPath(this.x, this.y)) {
                return connection;
            }
        }
        return false;
    }
}