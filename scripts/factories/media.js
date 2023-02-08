function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price, video } = data;
    
    const picture = `../assets/images/${photographerId}/${image}`;
    const videoSrc = `../assets/images/${photographerId}/${video}`;
    const dateOfCreation = `${date}`;
    const priceOfMedia = `${price}€`;
    const likesOfMedia = `${likes}`;


    getMediaDOM = () => {
        const article = document.createElement('article');
        article.setAttribute("class", "article media__article");

        const img = document.createElement('img');
        setAttributes(img, { "src": picture, "alt": title, "class": "media__img" });

        const video = document.createElement('video');
        setAttributes(video, { "src": videoSrc, "alt": title, "class": "media__video" });

        const divDescription = document.createElement('div');
        divDescription.setAttribute("class", "media__description");

        const textTitle = document.createElement('p');
        textTitle.setAttribute("class", "media__title");
        textTitle.textContent = title;

        const divLikes = document.createElement('div');
        divLikes.setAttribute("class", "media__likes");

        const textLikes = document.createElement('p');
        textLikes.setAttribute("class", "media__likes-number");
        textLikes.textContent = likesOfMedia;

        const heart = document.createElement('i');
        heart.setAttribute("class", "fas fa-heart media__likes-heart");

        article.append(img, video, divDescription);
        divDescription.append(textTitle, divLikes);
        divLikes.append(textLikes, heart);
        return (article);
    }

    return { id, photographerId, title, picture, videoSrc, dateOfCreation, priceOfMedia, likesOfMedia, getMediaDOM }

}