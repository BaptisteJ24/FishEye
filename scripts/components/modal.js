import { resetForm } from "./form.js";

let modal = null;
const focusableSelector = "button, a, input, textarea, video, control";
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
    modal = document.getElementById(e.target.getAttribute("data-modal"));
    focusableElements = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(":focus");
    focusableElements[0].focus();
    modal.classList.remove("hide");
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modal.querySelectorAll(".js-modal-close").forEach((el) => {
        el.addEventListener("click", closeModal);
    });
    window.addEventListener("keydown", keydownEvent);
    document.querySelector("main").setAttribute("aria-hidden", "true");
};

/**
 * @description Function to close modal.
 * Need a close button with class="js-modal-close".
 * @param {Event} e
*/
const closeModal = (e) => {
    if (modal === null) return;
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus();
    e.preventDefault();
    modal.classList.add("hide");
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.querySelectorAll(".js-modal-close").forEach((el) => {
        el.removeEventListener("click", closeModal);
    });
    if (modal.querySelector(".js-form-reset") && modal) {
        console.log("modal", modal);
        console.log("modal.querySelectorAll", modal.querySelectorAll(".js-form-reset"));
        const jsFormReset = modal.querySelectorAll(".js-form-reset");
        Array.from(jsFormReset).map((el) => {
            el.addEventListener("click", resetForm);
            el.click();
            el.removeEventListener("click", resetForm);
        });
    }
    modal = null;
    window.removeEventListener("keydown", keydownEvent);
    document.querySelector("main").removeAttribute("aria-hidden");
};

const focusInModal = (e) => {
    e.preventDefault();
    focusableElements = Array.from(modal.querySelectorAll(focusableSelector));
    let focusableElementsVisible = focusableElements.filter((el) => {
        return el.offsetWidth > 0 || el.offsetHeight > 0;
    });
    
    let index = focusableElementsVisible.findIndex(func => func === modal.querySelector(":focus"));

    e.shiftKey ? index-- : index++;
    index = index < 0 ? focusableElementsVisible.length - 1 : index;
    index = index >= focusableElementsVisible.length ? 0 : index;
    
    focusableElementsVisible[index].focus();
};

const keydownEvent = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e);
    }
};

export { openModal };