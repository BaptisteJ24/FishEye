import { setAttributes, getAllData, getDataByProperty, getDataById } from '../utils/utils.js';
import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/media.js';

const currentPage = document.querySelector('body').dataset.page;

const getMedia = async () => { // return : object
    try {
        const mediaArray = await getDataByProperty('../../data/photographers.json', 'media');
        console.log('mediaArray :', mediaArray);
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
        console.log('id :', id);
        return id;
    }
    catch (error) {
        console.error('Erreur lors de la récupération de l\'id : ', error);
    }
}

const getPhotographerDetailsById = async () => { // return : object
    try {
        const photographerId = await getPhotographerId();
        console.log('photographerId :', photographerId);
        const photographerDetails = await getDataById('../../data/photographers.json', 'photographers' , photographerId);
        console.log('photographerDetails :', photographerDetails);
        return photographerDetails;
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    }
}


const getMediaById = async () => {
    try {
        const photographerId = await getPhotographerId();
        console.log('photographerId :', photographerId);
        const mediaArray = await getMedia();
        console.log('mediaArray :', mediaArray);
        const mediaById = mediaArray.media.filter((obj) => obj.photographerId === JSON.parse(photographerId));
        console.log('mediaById :', mediaById);
        return ({ medias: mediaById })
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    };
}

const displayMedia = async (medias) => {
    const mediaSection = document.querySelector(".media__section");
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getMediaDOM(); // getMediaDOM(img or video)
        mediaSection.append(mediaDOM);
    });
}

const displayPhotographerDetails = async (photographerDetails) => {
    const photographerSection = document.querySelector(".photographer__section");
    photographerDetails.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const photographerDOM = photographerModel.getUserDetailsDOM();
        Object.values(photographerDOM).forEach((value) => {
            photographerSection.append(value);
        });
    });
}

const initMedia = async () => {
    const { medias } = await getMediaById();
    displayMedia(medias);
}

const initPhotographerDetails = async () => {
    const photographerDetails = await getPhotographerDetailsById();
    displayPhotographerDetails(photographerDetails);
}

// event listener on load photographer page.
if (currentPage === 'photographer') {
    window.addEventListener('load', initMedia);
    window.addEventListener('load', initPhotographerDetails);
}
