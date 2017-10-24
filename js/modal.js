
let modalTitle = document.getElementById('modal-title');
let modalClose = document.getElementById('modal-close');
let modalInput = document.getElementById('modal-input');
let modalSubmit = document.getElementById('modal-submit');

let modalScope;

class Modal {
    constructor (elementId) {
        this.docElement = document.getElementById(elementId);
    }

    close (e) {
        this.docElement.className = 'overlay';
        modalScope.onclose(modalInput.value);
    }
    submit (e) {
        this.docElement.className = 'overlay';
        modalScope.onsubmit(modalInput.value);
    }
    
    reset () {
        modalClose.removeEventListener('click', this.close);
        modalSubmit.removeEventListener('submit', this.submit);
    }
    
    input (title, inputValue) {
        this.reset();
    
        this.title = title;
        modalTitle.innerText = this.title;
        modalInput.value = inputValue;
        modalInput.select();
        
        this.onclose = function () {};
        this.onsubmit = function () {};
    
        modalScope = this;
        modalClose.addEventListener('click', this.close, false);
        modalSubmit.addEventListener('click', this.submit, false);
    
        // Show modal
        this.docElement.className += ' overlay-visible';
        modalInput.focus();   
    }
}