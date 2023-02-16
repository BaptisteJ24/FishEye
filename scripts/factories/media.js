import { setAttributes } from '../utils/utils.js';

const mediaFactory = (data) => {
    const { id, photographerId, title, image, likes, date, price, video } = data;

    const mediaSrc = `../assets/images/${photographerId}/`;
    const pictureSrc = mediaSrc + image;
    const videoSrc = mediaSrc + video;


    const getMediaDOM = (type) => {
        const article = document.createElement('article');
        article.setAttribute("class", "article media__article");

        let media;
        if (type === "img") {
            media = document.createElement('img');
            setAttributes(media, { "src": pictureSrc, "alt": title, "class": "media__img" });
        }
        else if (type === "video") {
            media = document.createElement('video');
            const src = document.createElement('source');
            const videoDownload = document.createElement('a');
            videoDownload.setAttribute("href", videoSrc);
            setAttributes(media, { "controls": "", "class": "media__video" });
            setAttributes(src, { "src": videoSrc, "type": "video/mp4" });
            media.append(src,'Download the', videoDownload, 'video');
        }

        const divImg = document.createElement('div');
        divImg.setAttribute("class", "media__img-container");
        divImg.append(media);

        const divDescription = document.createElement('div');
        divDescription.setAttribute("class", "media__description");

        const textTitle = document.createElement('p');
        textTitle.setAttribute("class", "media__title");
        textTitle.textContent = title;

        const divLikes = document.createElement('div');
        divLikes.setAttribute("class", "media__likes");

        const textLikes = document.createElement('p');
        textLikes.setAttribute("class", "media__likes-number");
        textLikes.textContent = likes;

        const heart = document.createElement('i');
        heart.setAttribute("class", "fas fa-heart media__likes-heart");

        article.append(divImg, divDescription);
        divDescription.append(textTitle, divLikes);
        divLikes.append(textLikes, heart);
        return (article);
    }

    return { id, photographerId, title, pictureSrc, videoSrc, date, price, likes, getMediaDOM }

}

export { mediaFactory };