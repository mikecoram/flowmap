let contextMenu = document.getElementById('context-menu');

function Option(title, onClick) {
    this.title = title;
    this.onClick = onClick;
}

let contextNode;

nodeContextOptions = [
    new Option('Add connection', function (e) {
        console.log('add connection')
    }),
    new Option('Rename', function (e) {
        renameNode(contextNode);
        hideContextMenu();
    }),
    new Option('Delete', function (e) {
        nodes.delete(contextNode, connections);
        draw();
        hideContextMenu();
    })
];

canvasContextOptions = [
    new Option('Add node', function (e) {
        addNode(e.x, e.y);
        hideContextMenu();
    }),
    new Option('Add connection', function (e) {
        console.log('add connection')
    })        
]

function showContextMenu(node, options, x, y) {
    contextNode = node;
    contextMenu.innerHTML = '';

    for (let i = 0; i < options.length; i++) {
        let o = options[i];
        contextMenu.innerHTML += '<li id="context-option-'+i+'">'+o.title+'</li>';
    }

    for (let i = 0; i < options.length; i++) {
        let o = options[i];
        document.getElementById('context-option-'+i).addEventListener('click', o.onClick, false);
    }

    contextMenu.className = 'context-menu context-menu-visible';
    contextMenu.style.left = x;
    contextMenu.style.top = y;
}

function hideContextMenu() {
    contextMenu.className = 'context-menu';
}