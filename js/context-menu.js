class ContextMenu {    
    static show (node, options, x, y) {
        ContextMenu.selectedNode = node;
        ContextMenu.docElement.innerHTML = '';
    
        for (let i = 0; i < options.length; i++) {
            let o = options[i];
            ContextMenu.docElement.innerHTML += '<li id="context-option-'+i+'">'+o.title+'</li>';
        }
    
        for (let i = 0; i < options.length; i++) {
            let o = options[i];
            document.getElementById('context-option-'+i).addEventListener('click', function (e) {
                o.onClick(e); 
                ContextMenu.hide(); 
            }, false);
        }
    
        ContextMenu.docElement.className = 'context-menu context-menu-visible';
        ContextMenu.docElement.style.left = x;
        ContextMenu.docElement.style.top = y;
    }
    
    static hide () {
        ContextMenu.docElement.className = 'context-menu';
    }
}

ContextMenu.docElement = document.getElementById('context-menu');