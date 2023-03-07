import { getCurrentPage } from './utils/utils.js';
import { hideLoader } from './components/loader.js';
import { updateLike } from './components/likes.js';
import * as photographerPage from './dom/pages/photographer.js';
import * as indexPage from './dom/pages/index.js';
import { openModal } from './components/modal.js';
import { validForm, resetForm, checkFormData } from './components/form.js';

let loadPage = async () => { };
let loadEvents = async () => { };
let keydownListener = () => { };

switch (getCurrentPage()) {
    case 'photographer': {

        loadPage = async () => {
            await photographerPage.initPhotographerDetails();
            await photographerPage.initMedia();
            await photographerPage.initPhotographerTotalLikesAndPrice();
        }

        /**
         * description: load all events for the page.
         */
        loadEvents = async () => {
            /* onclick in modal button, openModal. */
            document.querySelectorAll('.js-modal').forEach(modal => {
                modal.addEventListener('click', openModal)
            });

            /* onclick in form button, validForm. */
            document.querySelectorAll('.js-form-submit').forEach(submit => {
                submit.addEventListener('click', validForm)
            });

            /* when focusout in form input, checkFormData. */
            const form = document.getElementById('contact__form');
            Array.from(form.elements).forEach(element => {
                if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                    element.addEventListener('focusout', checkFormData);
                }
            });

            /* onclick in like button, updateLike. */
            document.querySelectorAll('.heart').forEach((like) => {
                like.addEventListener('click', updateLike);
            });

            /* onclick in media, show lightbox. */
            document.querySelectorAll('.media__link-media').forEach((mediaLink) => {

                const displayMediaLightbox = async (e) => {                  
                    if (e.type === 'click' || (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))) { // e.key === ' ' for spacebar
                        e.stopImmediatePropagation();
                        await photographerPage.initMediaLightbox(e);
                        openModal(e);

                        /* onclick in close button, hide lightbox. */
                        document.querySelector('.js-lightbox-close').addEventListener('click', () => {
                            /* remove all event to avoid multiple event listeners. */
                            document.querySelector('.js-lightbox-next').removeEventListener('click', photographerPage.nextMediaInLightbox);
                            document.querySelector('.js-lightbox-previous').removeEventListener('click', photographerPage.previousMediaInLightbox);
                            window.removeEventListener('keydown', keydownListener);
                        });

                        /* onclick in next button, nextMediaInLightbox. */
                        document.querySelector('.js-lightbox-next').addEventListener('click', photographerPage.nextMediaInLightbox);
                        /* onclick in previous button, previousMediaInLightbox. */
                        document.querySelector('.js-lightbox-previous').addEventListener('click', photographerPage.previousMediaInLightbox);
                        keydownListener = (e) => {
                            if (e.key === 'Left' || e.key === 'ArrowLeft') {
                                photographerPage.previousMediaInLightbox();
                            }
                            if (e.key === 'Right' || e.key === 'ArrowRight') {
                                photographerPage.nextMediaInLightbox();
                            }
                        }
                        window.addEventListener('keydown', keydownListener);
                    }
                }

                mediaLink.addEventListener('click', displayMediaLightbox);
                mediaLink.addEventListener('keydown', displayMediaLightbox);
            });

            /*accessibility event*/

        }
        break;
    }
    case 'index': {
        loadPage = async () => {
            await indexPage.initPhotographers();
        }
    }
}

window.addEventListener('load', async () => {
    await loadPage();
    loadEvents();
    setTimeout(() => {
        hideLoader();
    }, 2000);
});

export { loadEvents };