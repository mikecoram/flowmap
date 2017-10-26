class InfoPanel {
    constructor (elementId) {
        this.docElement = document.getElementById(elementId);
        this.title = document.getElementById('select-info-title');
        this.desc = document.getElementById('select-info-desc');
    }

    display () {
        this.docElement.style.visibility = 'visible';
    }

    displayNode (node) {
        this.title.innerHTML = node.title;
        this.display();
    }

    displayConnection (node) {
        this.display();
    }

    clear () {
        this.docElement.style.visibility = 'hidden';
    }
}