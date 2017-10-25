let contextMenu = new ContextMenu('context-menu');
let modal = new Modal('input-modal');

let canvas = new FlowMapCanvas('flowmap');
let chart = new Chart(canvas, modal);
let mouseHandler = new MouseHandler(canvas, chart, contextMenu);