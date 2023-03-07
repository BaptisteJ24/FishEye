import { resetForm } from './form.js';

let modal = null;
const focusableSelector = 'button, a, input, textarea, video, control';
let focusableElements = [];
let previouslyFocusedElement = null;

/**
 * @description Function to open modal.
 * Need to add data-modal attribute to the element that will open the modal. The value of the attribute must be the id of the modal.
 * Modal must have an id attribute.
 * Also, this function adding closeModal eventListener to the close button with class="js-modal-close".
 * @param {Event} e
 */
const openModal = (e) => {
    e.preventDefault();
    modal = document.getElementById(e.target.getAttribute('data-modal'));
    focusableElements = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus');
    focusableElements[0].focus();
    modal.classList.remove("hide");
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    window.addEventListener('keydown', keydownEvent);
}

/**
 * @description Function to close modal.
 * Need a close button with class="js-modal-close".
 * @param {Event} e
*/
const closeModal = (e) => {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault();
    modal.classList.add('hide');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    if (modal.querySelector('.js-form-reset')) {
        modal.querySelector('.js-form-reset').addEventListener('click', resetForm);
        modal.querySelector('.js-form-reset').click();
        modal.querySelector('.js-form-reset').removeEventListener('click', resetForm);
    }
    modal = null;
    window.removeEventListener('keydown', keydownEvent);
}

const focusInModal = (e) => {
    e.preventDefault();
    let index = focusableElements.findIndex(func => func === modal.querySelector(':focus'))

    e.shiftKey ? index-- : index++;
    index = index < 0 ? focusableElements.length - 1 : index;
    index = index >= focusableElements.length ? 0 : index;
    focusableElements[index].focus();
}

const keydownEvent = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal(e);
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e);
    }
}




export { openModal };