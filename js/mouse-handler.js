const MOUSE_BUTTON = { LEFT: 0, RIGHT: 1 };
const MOUSE_STATE = { UP: 'up', DOWN: 'down' };
const MOUSE_OPERATION = { NONE:'none', DRAWING_CONNECTION: 'drawing-connection' };

let mouse = {
    x: 0,
    y: 0,
    state: MOUSE_STATE.UP,
    operation: MOUSE_OPERATION.NONE,
    
    // stores distance from top left of selected node so that the node can be drawn in the correct position
    offset: {
        x:0, 
        y:0
    },

    dragNode: undefined,

    update: function(canvas, e) {
        let rect = canvas.docCanvas.getBoundingClientRect();
        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;
    },

    getNodeUnderCursor: function (chart) {
        for (let i = 0; i < chart.nodes.length; i++) {
            let node = chart.nodes[i];
            if (node.inBounds(mouse.x, mouse.y)) {
                return node;
            }
        }
        return false;
    },

    getConnectionUnderCursor: function (chart) {
        for (let i = 0; i < chart.connections.length; i++) {
            let connection = chart.connections[i];
            if (connection.inBounds(e.x, e.y)) {
                
            }
        }
    }
}

class MouseHandler {    
    constructor (canvas, chart, contextMenu, contextOptions) {
        this.addMouseEventListeners(canvas, canvas.docCanvas, chart, contextMenu, contextOptions);
    }

    addMouseEventListeners(canvas, docCanvas, chart, contextMenu, contextOptions) {
        docCanvas.addEventListener('mousemove', function(e) {
            mouse.update(canvas, e);
        
            if (mouse.dragNode && mouse.state == MOUSE_STATE.DOWN) {
                mouse.dragNode.x = mouse.x - mouse.offset.x;
                mouse.dragNode.y = mouse.y - mouse.offset.y;
                canvas.draw(chart);
            }
        
            if (chart.partialConnection) {
                canvas.draw(chart);
            }
            
        }, false);
        
        docCanvas.addEventListener('mousedown', function (e) {
            if (e.button == MOUSE_BUTTON.LEFT) {
                mouse.state = MOUSE_STATE.DOWN;
                contextMenu.hide();
            
                if (mouse.operation == MOUSE_OPERATION.DRAWING_CONNECTION) {
                    let node = mouse.getNodeUnderCursor(chart);
                    chart.updateConnection(node);
                }
                else if (mouse.operation == MOUSE_OPERATION.NONE) {
                    let node;
                    if (node = mouse.getNodeUnderCursor(chart)) {
                        // Drag node
                        mouse.offset.x = mouse.x - node.x;
                        mouse.offset.y = mouse.y - node.y;
                        mouse.dragNode = node;
                    }

                    let connection;
                    if (connection = mouse.getConnectionUnderCursor(chart)) {

                    }
                }
            
                canvas.draw(chart);
            }
        }, false);
        
        docCanvas.addEventListener('mouseup', function (e) {
            mouse.state = MOUSE_STATE.UP;
            mouse.dragNode = undefined;
        }, false);
        
        docCanvas.addEventListener('dblclick', function(e) {
            if (mouse.operation == MOUSE_OPERATION.NONE) {
                let node;
                if (node = mouse.getNodeUnderCursor(chart)) {
                    chart.renameNode(node);
                }
            }
        }, false);
        
        docCanvas.oncontextmenu = function (e) {
            e.preventDefault();
        
            if (mouse.operation == MOUSE_OPERATION.DRAWING_CONNECTION) {
                chart.abandonConnection();
            }
            else if (mouse.operation == MOUSE_OPERATION.NONE) {
                let node, options;
                if (node = mouse.getNodeUnderCursor(chart)) {
                    options = contextOptions.node;
                }
                else
                    options = contextOptions.canvas;
                    
                contextMenu.show(node, options, e.x, e.y);
            }
        };
    }
}