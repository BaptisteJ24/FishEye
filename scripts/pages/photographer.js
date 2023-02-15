import { setAttributes, getCurrentPage, getAllData, getDataByProperty, getDataById } from '../utils/utils.js';
import { photographerFactory } from '../factories/photographer.js';
import { mediaFactory } from '../factories/media.js';

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
    medias.forEach((media) => {
        const type = media.image ? 'img' : 'video';
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getMediaDOM(type); // getMediaDOM(img or video)
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

if (getCurrentPage() === 'photographer') {
    window.addEventListener('load', () => { 
        initMedia(); 
        initPhotographerDetails();
    });
}


// function focusNextListItem(direction) {
//   const activeElementId = document.activeElement.id;
//   if (activeElementId === "dropdown__selected") {
//     document.querySelector(`#${listItemIds[0]}`).focus();
//   } 
//   else {
//     const currentActiveElementIndex = listItemIds.indexOf(activeElementId);
//   }
// }


// sort media by Likes, Date or Title
// document.querySelector('.sort__option--chevron').addEventListener('click', () => {
//     const listOptions = document.querySelectorAll('.sort__option--border');
//     listOptions.forEach((option) => {
//         option.classList.toggle('hide');
//     })
// });