async function getMediaById(photographerId) {
    //  Requête fetch pour récupérer les données des médias dans data/media.json
    try {
        const mediaArray = await getDataById('../../data/photographers.json', 'media', photographerId, 'photographerId');
        return ({ media: mediaArray })
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    };
}

async function getMedia() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        return await getMediaById(id);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    }

}

async function displayMedia(media) {
    const mediaSection = document.querySelector(".media__section");

    media.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getMediaDOM();
        mediaSection.appendChild(mediaDOM);
    });
}

async function initMedia() {
    // Récupère les datas des médias
    const { media } = await getMedia();
    displayMedia(media);
}

initMedia();

if (window.location.pathname === '/views/photographer.html') {
    window.addEventListener('load', getMedia);
}//Mettre le code JavaScript lié à la page photographer.html