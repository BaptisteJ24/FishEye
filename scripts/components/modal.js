let modal = null;

/**
 * @description Function to open modal.
 * Need to add data-modal attribute to the element that will open the modal.
 * Modal must have an id attribute.
 * Also, this function adding closeModal eventListener to the close button with class="js-modal-close".
 * @param {Event} e
 */
const openModal = (e) => {
    e.preventDefault();
    console.log(e.target);
    const target = document.getElementById(e.target.getAttribute('data-modal'));
    console.log(target);
    target.classList.remove("hide");
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
}

/**
 * @description Function to close modal.
 * Need a close button with class="js-modal-close".
 * @param {Event} e
*/
const closeModal = (e) => {
    if (modal === null) return;
    e.preventDefault();
    modal.classList.add('hide');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal = null;
}

export { openModal };