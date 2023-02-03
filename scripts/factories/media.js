function mediaFactory(data) {
    const { id, photographerId, title, image, likes, date, price, video } = data;

    const picture = `../assets/images/${photographerId}/${image}`;
    const videoSrc = `../assets/images/${photographerId}/${video}`;
    const dateOfCreation = `${date}`;
    const priceOfMedia = `${price}€`;
    const likesOfMedia = `${likes}`;

    getMediaDOM = () => {
        const article = document.createElement( 'article' );
        article.setAttribute("class", "article media__article");

        const divLink = document.createElement( 'div' );
        divLink.setAttribute("class", "media__link");

        const img = document.createElement( 'img' );
        setAttributes(img, {"src" : picture, "alt" : title, "class" : "media__img" });

        const divDescription = document.createElement( 'div' );
        divDescription.setAttribute("class", "media__description");

        const textTitle = document.createElement( 'p' );
        textTitle.setAttribute("class", "media__title");
        textTitle.textContent = title;

        const textDate = document.createElement( 'p' );
        textDate.setAttribute("class", "media__date");
        textDate.textContent = dateOfCreation;

        const textPrice = document.createElement( 'p' );
        textPrice.setAttribute("class", "media__price");
        textPrice.textContent = priceOfMedia;

        const divLikes = document.createElement( 'div' );
        divLikes.setAttribute("class", "media__likes");

        const textLikes = document.createElement( 'p' );
        textLikes.setAttribute("class", "media__likes-number");
        textLikes.textContent = likesOfMedia;

        

        article.append(divLink, divDescription, divLikes);
        divLink.append(img);
        divDescription.append(textTitle, textDate, textPrice);
        divLikes.append(textLikes);
        return (article);
    }

    return { id, photographerId, title, picture, videoSrc, dateOfCreation, priceOfMedia, likesOfMedia, getMediaDOM }

}