class FlowMap {
    constructor (canvasId, contextMenuId, modalId, infoPanelId) {
        let contextMenu = new ContextMenu(contextMenuId);
        let modal = new Modal(modalId);
        let infoPanel = new InfoPanel(infoPanelId);
        
        let canvas = new FlowMapCanvas(canvasId);
        let chart = new Chart(canvas, modal);
        let contextOptions = new ContextOptions(chart, contextMenu);

        let mouseHandler = new MouseHandler(canvas, chart, contextMenu, contextOptions, infoPanel);
    }
}

