class Modal {
    constructor (elementId) {
        this.docElement = document.getElementById(elementId);

        this.titleElement = document.getElementById('modal-title');
        this.closeElement = document.getElementById('modal-close');
        this.inputElement = document.getElementById('modal-input');
        this.submitElement = document.getElementById('modal-submit');        
    }
    
    reset () {
    }
    
    input (title, inputValue) {
        this.reset();
    
        this.title = title;
        this.titleElement.innerHTML = this.title;
        this.inputElement.value = inputValue;
        this.inputElement.select();
        
        this.onclose = function () {};
        this.onsubmit = function () {};

        let modalScope = this;
    
        this.closeElement.addEventListener('click', function closeClicked (e) {
            // Remove event handler as one is added each time an input modal is spawned            
            modalScope.closeElement.removeEventListener("click", closeClicked, false);
            
            modalScope.docElement.className = 'overlay';
            modalScope.onclose(modalScope.inputElement.value);
        }, false);
        this.submitElement.addEventListener('click', function submitClicked (e) {
            // Remove event handler as one is added each time an input modal is spawned
            modalScope.submitElement.removeEventListener("click", submitClicked, false);            
            
            modalScope.docElement.className = 'overlay';
            modalScope.onsubmit(modalScope.inputElement.value);
        }, false);

        // Show modal
        this.docElement.className += ' overlay-visible';
        this.inputElement.focus();   
    }
}