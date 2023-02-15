import { getCurrentPage, getDataByProperty, getDataById } from '../utils/utils.js';
import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/media.js';
import { displayModal } from '../utils/contactForm.js';

const getMedia = async () => { // return : object
    try {
        const mediaArray = await getDataByProperty('../../data/photographers.json', 'media');
        return ({ media: mediaArray })

    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    }
}

const getPhotographerId = async () => { // return : number (id)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        return id;
    }
    catch (error) {
        console.error('Erreur lors de la récupération de l\'id : ', error);
    }
}

const getPhotographerDetailsById = async () => { // return : object
    try {
        const photographerId = await getPhotographerId();
        const photographerDetails = await getDataById('../../data/photographers.json', 'photographers', photographerId);
        return photographerDetails;
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    }
}


const getMediaById = async () => {
    try {
        const photographerId = await getPhotographerId();
        const mediaArray = await getMedia();
        const mediaById = mediaArray.media.filter((obj) => obj.photographerId === JSON.parse(photographerId));
        return ({ medias: mediaById })
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    };
}

const displayMedia = async (medias, sortOption) => {
    switch (sortOption) {
        case 'popularity':
            medias.sort((a, b) => b.likes - a.likes);
            break;
        case 'date':
            medias.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'title':
            medias.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            medias.sort((a, b) => b.likes - a.likes);
            break;
    }

    const mediaSection = document.querySelector(".media__section");
    mediaSection.innerHTML = '';
    medias.forEach((media) => {
        const type = media.image ? 'img' : 'video';
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getMediaDOM(type);
        mediaSection.append(mediaDOM);
    });
}

const displayPhotographerDetails = async (photographerDetails) => {
    const photographerSection = document.querySelector(".photographer__section");
    photographerSection.innerHTML = '';
    photographerDetails.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const photographerDOM = photographerModel.getUserDetailsDOM();
        Object.values(photographerDOM).forEach((value) => {
            photographerSection.append(value);
        });
    });
}

const initMedia = async (sortOption) => {
    const { medias } = await getMediaById();
    displayMedia(medias, sortOption);
}

const initPhotographerDetails = async () => {
    const photographerDetails = await getPhotographerDetailsById();
    displayPhotographerDetails(photographerDetails);
    const contactButton = document.querySelector('[data-name="contactButton"]');
    return contactButton;
}

const loadPhotographerPage = async (sortOption = "popularity") => {
    await initMedia(sortOption);
    const contactButton = await initPhotographerDetails();
    contactButton.addEventListener('click', displayModal);
}

// event listener on load photographer page.
if (getCurrentPage() === 'photographer') {
    window.addEventListener('load', loadPhotographerPage);
}

export { loadPhotographerPage }