class FlowMap {
    constructor (canvasId, contextMenuId, modalId, infoPanelId) {
        let contextMenu = new ContextMenu(contextMenuId);
        let modal = new Modal(modalId);
        let infoPanel = new InfoPanel(infoPanelId);

        let mouse = new Mouse();
        
        let canvas = new FlowMapCanvas(canvasId, mouse);
        let chart = new Chart(canvas, mouse, modal);
        let contextOptions = new ContextOptions(chart, contextMenu);

        let mouseHandler = new MouseHandler(mouse, canvas, chart, contextMenu, contextOptions, infoPanel);
    }
}

