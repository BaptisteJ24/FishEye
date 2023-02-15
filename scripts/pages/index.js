import { setAttributes, getCurrentPage, getAllData, getDataByProperty, getDataById } from '../utils/utils.js';
import { photographerFactory } from '../factories/photographer.js';

const getPhotographers = async () => {
    //  Requête fetch pour récupérer les données des photographes dans data/photographers.json
    try {
        const photographersArray = await getDataByProperty('../../data/photographers.json', 'photographers');
        return ({ photographers: photographersArray })
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    };
};

const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographers__section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

const initPhotographers = async () => {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

if (getCurrentPage() === 'index') {
    window.addEventListener('load', initPhotographers());
}

