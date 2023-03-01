import { getCurrentPage } from './utils/utils.js';
import { hideLoader } from './components/loader.js';
import { updateLike } from './components/likes.js';
import * as photographerPage from './dom/pages/photographer.js';
import * as indexPage from './dom/pages/index.js';
import { openModal } from './components/modal.js';
import { validForm, resetForm, checkFormData } from './components/form.js';

let loadPage = async () => { };
let loadEvents = async () => { };

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

            /* onclick in close form button, resetForm. */
            document.querySelectorAll('.js-form-reset').forEach(reset => {
                reset.addEventListener('click', resetForm)
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
            document.querySelectorAll('.media__link').forEach((link) => {
                link.addEventListener('click', async (e) => {
                    await photographerPage.initMediaLightbox(e);
                    document.getElementById('media_lightbox').classList.remove('hide');

                    /* onclick in close button, hide lightbox. */
                    document.querySelector('.js-lightbox-close').addEventListener('click', () => {
                        document.getElementById('media_lightbox').classList.add('hide');

                        /* remove all event to avoid multiple event listeners. */
                        document.querySelector('.js-lightbox-close').removeEventListener('click', () => {
                            document.getElementById('media_lightbox').classList.add('hide');
                        });
                        document.querySelector('.js-lightbox-next').removeEventListener('click', photographerPage.nextMediaInLightbox);
                        document.querySelector('.js-lightbox-previous').removeEventListener('click', photographerPage.previousMediaInLightbox);
                    });
                    
                    /* onclick in next button, nextMediaInLightbox. */
                    document.querySelector('.js-lightbox-next').addEventListener('click', photographerPage.nextMediaInLightbox);

                    /* onclick in previous button, previousMediaInLightbox. */
                    document.querySelector('.js-lightbox-previous').addEventListener('click', photographerPage.previousMediaInLightbox);
                });
            });
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