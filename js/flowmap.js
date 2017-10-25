class FlowMap {
    constructor (canvasId, contextMenuId, modalId, selectInfoId) {
        let contextMenu = new ContextMenu(contextMenuId);
        let modal = new Modal(modalId);
        let selectInfo = new SelectionInfo(selectInfoId);
        
        let canvas = new FlowMapCanvas(canvasId);
        let chart = new Chart(canvas, modal);
        this.chart = chart;

        let contextOptions = new ContextOptions(chart, contextMenu);

        let mouseHandler = new MouseHandler(canvas, chart, contextMenu, contextOptions, selectInfo);
    }
}

