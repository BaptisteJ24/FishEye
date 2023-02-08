async function getMedia() { // return : object
    try {
        const mediaArray = await getDataByProperty('../../data/photographers.json', 'media');
        console.log('mediaArray :', mediaArray);
        return ({ media: mediaArray })

    }
    catch (error) {
        console.error('Erreur lors de la récupération des données : ', error);
    }
}

async function getPhotographerId() { // return : number (id)
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

async function getMediaById() {
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

async function displayMedia(medias) {
    const mediaSection = document.querySelector(".media__section");

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaDOM = mediaModel.getMediaDOM();
        mediaSection.append(mediaDOM);
    });
}

async function initMedia() {
    const { medias } = await getMediaById();
    displayMedia(medias);
}

// event listener on load photographer page.
if (window.location.pathname === '/views/photographer.html') {
    window.addEventListener('load', initMedia);
}