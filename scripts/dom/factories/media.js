import { setAttributes } from '../../utils/utils.js';

const mediaFactory = (data) => {

    try {
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
                media.setAttribute("src", pictureSrc);
            }
            else if (type === "video") {
                media = document.createElement('video');
                const src = document.createElement('source');
                const videoDownload = document.createElement('a');
                videoDownload.setAttribute("href", videoSrc);
                setAttributes(src, { "src": videoSrc, "type": "video/mp4" });
                media.append(src, 'Download the', videoDownload, 'video');
            }
            setAttributes(media, { "alt": title, "class": "media__link-media", "data-id": id, "data-modal" : "media__lightbox", "tabindex": "0"});
            

            const link = document.createElement('a');
            setAttributes(link, { "class" : "media__link", "href" : "#", "tabindex": "-1"});
            link.append(media);

            const divImg = document.createElement('div');
            divImg.setAttribute("class", "media__link-media-container");
            divImg.append(link);

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

            const divHeart = document.createElement('button');
            divHeart.setAttribute("class", "heart");

            const heartEmpty = document.createElement('span');
            heartEmpty.setAttribute("class", "far fa-heart heart__icon heart__icon--empty");

            const heartHideContainer = document.createElement('span');
            heartHideContainer.setAttribute("class", "heart__icon heart__icon--hide-container");

            const heartHide = document.createElement('span');
            heartHide.setAttribute("class", "fas fa-heart heart__icon--hide");

            heartHideContainer.append(heartHide);
            divHeart.append(heartEmpty, heartHideContainer);

            article.append(divImg, divDescription);
            divDescription.append(textTitle, divLikes);
            divLikes.append(textLikes, divHeart);
            return (article);
        }

        const getMediaLightboxDOM = (type) => {

            let media;
            if (type === "img") {
                media = document.createElement('img');
                setAttributes(media, { "src": pictureSrc, "alt": title, "class": "lightbox__media" });
            }
            else if (type === "video") {
                media = document.createElement('video');
                const src = document.createElement('source');
                setAttributes(media, { "controls": "", "class": "lightbox__media" });
                setAttributes(src, { "src": videoSrc, "type": "video/mp4" });
                media.append(src);
            }

            const textTitle = document.createElement('p');
            textTitle.setAttribute("class", "lightbox__title");
            textTitle.textContent = title;

            return { media: media, textTitle: textTitle };
        }

        return { id, photographerId, title, pictureSrc, videoSrc, date, price, likes, getMediaDOM, getMediaLightboxDOM }
    }
    catch (error) {
        console.error('ça marche pas');
    }
}

export { mediaFactory };