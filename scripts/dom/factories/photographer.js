import { setAttributes } from '../../utils/utils.js';

const photographerFactory = (data) => {
    try {
        const { name, portrait, id, city, country, price, tagline } = data;
        const picture = `./assets/photographers/${portrait}`;
        const location = `${city}, ${country}`;
        const description = `${tagline}`;
        const pricePerDay = `${price}€ / jour`;

        const getUserCardDOM = () => {
            const article = document.createElement('article');
            article.setAttribute("class", "article photographers__article");
            const link = document.createElement('a');
            link.setAttribute("class", "photographers__link");
            link.setAttribute("href", `./views/photographer.html?id=${id}`);

            const imgPhotographer = document.createElement('img');
            setAttributes(imgPhotographer, { "src": picture, "alt": name, "class": "photographers__img" });

            const h2 = document.createElement('h2');
            h2.setAttribute("class", "h2 photographers__title");
            h2.textContent = name;

            const divDescription = document.createElement('div');
            divDescription.setAttribute("class", "photographers__description");

            const textLocation = document.createElement('p');
            textLocation.setAttribute("class", "photographers__location");
            textLocation.textContent = location;

            const textTagLine = document.createElement('p');
            textTagLine.setAttribute("class", "photographers__tag-line");
            textTagLine.textContent = description;

            const textPrice = document.createElement('p');
            textPrice.setAttribute("class", "photographers__price");
            textPrice.textContent = pricePerDay;

            article.append(link, divDescription);
            link.append(imgPhotographer, h2);
            divDescription.append(textLocation, textTagLine, textPrice);
            return (article);
        }

        const getUserDetailsDOM = () => {
            const pictureSrc = '.' + picture;

            const divDetails = document.createElement('div');
            divDetails.setAttribute("class", "photographer__details");

            const title = document.createElement('h1');
            title.setAttribute("class", "h1 photographer__title");
            title.textContent = name;

            const divDescription = document.createElement('div');
            divDescription.setAttribute("class", "");

            const textLocation = document.createElement('p');
            textLocation.setAttribute("class", "photographer__location");
            textLocation.textContent = location;

            const textTagLine = document.createElement('p');
            textTagLine.setAttribute("class", "photographer__tag-line");
            textTagLine.textContent = description;

            const divImg = document.createElement('div');
            divImg.setAttribute("class", "photographer__img-container");

            const img = document.createElement('img');
            setAttributes(img, { "src": pictureSrc, "alt": name, "class": "photographer__img" });

            const divButton = document.createElement('div');
            divButton.setAttribute("class", "photographer__button-container");

            const button = document.createElement('button');
            setAttributes(button, { "class": "button js-modal", "data-name": "contactButton", "data-modal": "contact_modal", "data-form": "contact__form" });
            button.textContent = "Contactez-moi";

            divDescription.append(textLocation, textTagLine);
            divDetails.append(title, divDescription);
            divImg.append(img);
            divButton.append(button);

            return ({ divDetails, divButton, divImg });
        }

        const getTotalLikesAndPriceDOM = (totalLikes) => {
            const divTotalLikes = document.createElement('div');
            divTotalLikes.setAttribute("class", "photographer__aside__total-likes-container");

            const textTotalLikes = document.createElement('p');
            textTotalLikes.setAttribute("class", "photographer__aside__total-likes-text");
            textTotalLikes.textContent = totalLikes;

            const heart = document.createElement('span');
            heart.setAttribute("class", "fas fa-heart photographer__aside__total-likes-heart");

            divTotalLikes.append(textTotalLikes, heart);

            const textPrice = document.createElement('p');
            textPrice.setAttribute("class", "photographer__aside__price");
            textPrice.textContent = pricePerDay;

            return ({ divTotalLikes, textPrice });
        }

        if (!name || !picture || !id || !location || !description || !pricePerDay) {
            throw new Error('Missing data');
        }

        return { name, picture, id, location, description, pricePerDay, getUserCardDOM, getUserDetailsDOM, getTotalLikesAndPriceDOM };
    } catch (error) {
        console.error(error);
    }

}


export { photographerFactory };