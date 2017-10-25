class FlowMap {
    constructor (canvasId, contextMenuId, modalId) {
        let contextMenu = new ContextMenu(contextMenuId);
        let modal = new Modal(modalId);
        
        let canvas = new FlowMapCanvas(canvasId);
        let chart = new Chart(canvas, modal);

        let contextOptions = new ContextOptions(chart, contextMenu);

        let mouseHandler = new MouseHandler(canvas, chart, contextMenu, contextOptions);
    }
}