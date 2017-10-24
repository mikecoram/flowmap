let contextMenu = document.getElementById('context-menu');

function Option(title, onClick) {
    this.title = title;
    this.onClick = onClick;
}

let contextNode;

nodeContextOptions = [
    new Option('Add connection', function (e) {
        startConnection(contextNode);
    }),
    new Option('Rename', function (e) {
        renameNode(contextNode);
    }),
    new Option('Delete', function (e) {
        removeNode(contextNode);
    })
];

canvasContextOptions = [
    new Option('Add node', function (e) {
        addNode(e.x, e.y);
    }),
    new Option('Add connection', function (e) {
        startConnection(contextNode);
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
        document.getElementById('context-option-'+i).addEventListener('click', function (e) {
            o.onClick(e); 
            hideContextMenu(); 
        }, false);
    }

    contextMenu.className = 'context-menu context-menu-visible';
    contextMenu.style.left = x;
    contextMenu.style.top = y;
}

function hideContextMenu() {
    contextMenu.className = 'context-menu';
}