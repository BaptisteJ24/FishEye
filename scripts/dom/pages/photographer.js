import { getDataByProperty, getDataById } from '../../utils/utils.js';
import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/media.js';
import { indexOf } from 'lodash';

let mediasArray = [];
let index = 0;

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

const displayMedia = async (medias) => {
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

    const photographerModel = photographerFactory(photographerDetails);
    const photographerDOM = photographerModel.getUserDetailsDOM();
    Object.values(photographerDOM).forEach((value) => {
        photographerSection.append(value);
    });

}

const displayPhotographerTotalLikesAndPrice = async (medias, photographer) => {
    const photographerAside = document.querySelector(".photographer__aside");
    photographerAside.innerHTML = '';
    const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0);
    const TotalLikesAndPriceModel = photographerFactory(photographer);
    const TotalLikesAndPriceDOM = TotalLikesAndPriceModel.getTotalLikesAndPriceDOM(totalLikes);
    Object.values(TotalLikesAndPriceDOM).forEach((value) => {
        photographerAside.append(value);
    });
}

const initPhotographerTotalLikesAndPrice = async () => {
    const { medias } = await getMediaById();
    const photographer = await getPhotographerDetailsById();
    displayPhotographerTotalLikesAndPrice(medias, photographer);
}

const initMedia = async (sortOption = "popularity") => {
    const { medias } = await getMediaById();

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

    displayMedia(medias);

    mediasArray = medias;
    console.log(mediasArray);
}

const initPhotographerDetails = async () => {
    const photographerDetails = await getPhotographerDetailsById();
    displayPhotographerDetails(photographerDetails);
    const modalHeaderName = document.querySelector('.modal__header__name');
    modalHeaderName.textContent = photographerDetails.name;
}

const displayMediaLightbox = async (indexLightbox) => {
    const lightbox = document.querySelector('.lightbox__media-title');
    lightbox.innerHTML = '';
    index = indexLightbox;
    console.log('index display:', index);
    const media = mediasArray[index];
    const type = media.image ? 'img' : 'video';
    const mediaModel = mediaFactory(media);
    const mediaDOM = mediaModel.getMediaLightboxDOM(type);
    lightbox.append(...Object.values(mediaDOM));
}

const initMediaLightbox = async (event) => {
    event.preventDefault();
    let indexLightbox = mediasArray.findIndex(obj => obj.id === parseInt(event.target.dataset.id));
    index = indexLightbox;
    console.log('index :', index);
    displayMediaLightbox(indexLightbox);
}

const nextMediaInLightbox = async () => {
    let nextIndex = index + 1;
    if (nextIndex >= mediasArray.length) {
        nextIndex = 0;
    }
    displayMediaLightbox(nextIndex);
}

const previousMediaInLightbox = async () => {
    let previousIndex = index - 1;
    if (previousIndex < 0) {
        previousIndex = mediasArray.length - 1;
    }
    displayMediaLightbox(previousIndex);
}

export { initMedia, initPhotographerDetails, initPhotographerTotalLikesAndPrice, initMediaLightbox, nextMediaInLightbox, previousMediaInLightbox };

