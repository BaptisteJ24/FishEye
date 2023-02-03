
async function getPhotographers() {
    //  Requête fetch pour récupérer les données des photographes dans data/photographers.json
    try {
        const photographersArray = await getDataByProperty('../../data/photographers.json', 'photographers');
        return ({ photographers: photographersArray })
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    };
};

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer__section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function initPhotographers() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

initPhotographers();