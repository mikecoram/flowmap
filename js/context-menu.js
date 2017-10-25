class ContextMenu {
    constructor (elementId) {
        this.docElement = document.getElementById(elementId);
    }

    show (selected, options, x, y) {
        this.selected = selected;
        this.docElement.innerHTML = '';
    
        for (let i = 0; i < options.length; i++) {
            let o = options[i];
            this.docElement.innerHTML += '<li id="context-option-'+i+'">'+o.title+'</li>';
        }
    
        for (let i = 0; i < options.length; i++) {
            let o = options[i];
            let scope = this;
            document.getElementById('context-option-'+i).addEventListener('click', function (e) {
                o.onClick(e); 
                scope.hide(); 
            }, false);
        }
    
        this.docElement.className = 'context-menu context-menu-visible';
        this.docElement.style.left = x;
        this.docElement.style.top = y;
    }
    
    hide () {
        this.docElement.className = 'context-menu';
    }
}