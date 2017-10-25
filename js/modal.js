

let modalScope;

class Modal {
    constructor (elementId) {
        this.docElement = document.getElementById(elementId);

        this.titleElement = document.getElementById('modal-title');
        this.closeElement = document.getElementById('modal-close');
        this.inputElement = document.getElementById('modal-input');
        this.submitElement = document.getElementById('modal-submit');        
    }

    close (e) {
        modalScope.docElement.className = 'overlay';
        modalScope.onclose(modalScope.inputElement.value);
    }
    submit (e) {
        modalScope.docElement.className = 'overlay';
        modalScope.onsubmit(modalScope.inputElement.value);
    }
    
    reset () {
        this.closeElement.removeEventListener('click', this.close);
        this.submitElement.removeEventListener('submit', this.submit);
    }
    
    input (title, inputValue) {
        this.reset();
    
        this.title = title;
        this.titleElement.innerHTML = this.title;
        this.inputElement.value = inputValue;
        this.inputElement.select();
        
        this.onclose = function () {};
        this.onsubmit = function () {};

        modalScope = this;
    
        this.closeElement.addEventListener('click', this.close, false);
        this.submitElement.addEventListener('click', this.submit, false);
    
        // Show modal
        this.docElement.className += ' overlay-visible';
        this.inputElement.focus();   
    }
}