import { setAttributes } from '../utils/utils.js';

const photographerFactory = (data) => {
    const { name, portrait, id, city, country, price, tagline } = data;

    const picture = `./assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const description = `${tagline}`;
    const pricePerDay = `${price}€/jour`;

    const getUserCardDOM = () => {
        const article = document.createElement('article');
        article.setAttribute("class", "article photographers__article");

        const divLink = document.createElement('div');
        divLink.setAttribute("class", "photographers__link");
        divLink.addEventListener("click", () => {
            window.location.href = `./views/photographer.html?id=${id}`;
        });

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

        article.append(divLink, divDescription);
        divLink.append(imgPhotographer, h2);
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
        textLocation.setAttribute("class", "");
        textLocation.textContent = location;

        const textTagLine = document.createElement('p');
        textTagLine.setAttribute("class", "");
        textTagLine.textContent = description;

        const divImg = document.createElement('div');
        divImg.setAttribute("class", "photographer__img-container");

        const img = document.createElement('img');
        setAttributes(img, { "src": pictureSrc, "alt": name, "class": "photographer__img" });
        
        const divButton = document.createElement('div');
        divButton.setAttribute("class", "photographer__button-container");

        const button = document.createElement('button');
        button.setAttribute("class", "button");
        button.textContent = "Contactez-moi";

        divDescription.append(textLocation, textTagLine);
        divDetails.append(title, divDescription);
        divImg.append(img);
        divButton.append(button);
        return ({ divDetails, divButton, divImg });

    }


    return { name, picture, id, location, description, pricePerDay, getUserCardDOM, getUserDetailsDOM }
}


export { photographerFactory };