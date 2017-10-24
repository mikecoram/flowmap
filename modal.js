let modal = document.getElementById('input-modal');

let modalTitle = document.getElementById('modal-title');
let modalClose = document.getElementById('modal-close');
let modalInput = document.getElementById('modal-input');
let modalSubmit = document.getElementById('modal-submit');

let modalScope;
function close (e) {
    modal.className = 'overlay';
    modalScope.onclose(modalInput.value);
}
function submit (e) {
    modal.className = 'overlay';
    modalScope.onsubmit(modalInput.value);
}

function resetModal() {
    modalClose.removeEventListener('click', close);
    modalSubmit.removeEventListener('submit', submit);
}

function InputModal(title, inputValue) {
    resetModal();

    this.title = title;
    modalTitle.innerText = this.title;
    modalInput.value = inputValue;
    modalInput.select();
    
    this.onclose = function () {};
    this.onsubmit = function () {};

    modalScope = this;
    modalClose.addEventListener('click', close, false);
    modalSubmit.addEventListener('click', submit, false);

    // Show modal
    modal.className += ' overlay-visible';
    modalInput.focus();
    
}