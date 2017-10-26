class MouseHandler {    
    constructor (mouse, canvas, chart, contextMenu, contextOptions, infoPanel) {
        this.initMouseObject(mouse, infoPanel);
        this.addMouseEventListeners(canvas, canvas.docCanvas, chart, contextMenu, contextOptions);
    }

    initMouseObject (mouse, infoPanel) {
        // Give mouse object access to infoPanel panel
        this.mouse = mouse;
        this.mouse.infoPanel = infoPanel;
    }

    addMouseEventListeners(canvas, docCanvas, chart, contextMenu, contextOptions, infoPanel) {
        let mouse = this.mouse;
        
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
                mouse.resetSelection();
            
                if (mouse.operation == MOUSE_OPERATION.DRAWING_CONNECTION) {
                    let node = mouse.getNodeUnderCursor(chart);
                    chart.updateConnection(node);
                }
                else if (mouse.operation == MOUSE_OPERATION.NONE) {
                    let node, connection;
                    if (node = mouse.getNodeUnderCursor(chart)) {
                        mouse.selectNode(node);
                        // Drag node
                        mouse.offset.x = mouse.x - node.x;
                        mouse.offset.y = mouse.y - node.y;
                        mouse.dragNode = node;
                    }
                    else if (connection = mouse.getConnectionUnderCursor(chart)) {
                        mouse.selectConnection(connection);
                    }
                    else {
                        mouse.resetSelection();
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
                mouse.resetSelection();
                chart.draw();

                let node, connection, options, selected;
                if (node = mouse.getNodeUnderCursor(chart)) {
                    mouse.selectNode(node);
                    options = contextOptions.node;
                    selected = node;
                }
                else if (connection = mouse.getConnectionUnderCursor(chart)) {
                    mouse.selectConnection(connection);
                    options = contextOptions.connection;
                    selected = connection;        
                }
                else
                    options = contextOptions.canvas;
                    
                chart.draw();
                contextMenu.show(selected, options, e.x, e.y);
            }
        };
    }
}