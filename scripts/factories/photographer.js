import { setAttributes } from '../utils/utils.js';

const photographerFactory = (data) => {
    const { name, portrait, id, city, country, price, tagline } = data;

    const picture = `./assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const description = `${tagline}`;
    const pricePerDay = `${price}€/jour`;

    const getUserCardDOM = () => {
        const article = document.createElement( 'article' );
        article.setAttribute("class", "article photographer__article");

        const divLink = document.createElement( 'div' );
        divLink.setAttribute("class", "photographer__link");
        divLink.addEventListener("click", () => {
            window.location.href = `./views/photographer.html?id=${id}`;
        });

        const imgPhotographer = document.createElement( 'img' );
        setAttributes(imgPhotographer, {"src" : picture, "alt" : name, "class" : "photographer__img" });

        const h2 = document.createElement( 'h2' );
        h2.setAttribute("class", "h2 photographer__title");
        h2.textContent = name;

        const divDescription = document.createElement( 'div' );
        divDescription.setAttribute("class", "photographer__description");

        const textLocation = document.createElement( 'p' );
        textLocation.setAttribute("class", "photographer__location");
        textLocation.textContent = location;

        const textTagLine = document.createElement( 'p' );
        textTagLine.setAttribute("class", "photographer__tag-line");
        textTagLine.textContent = description;

        const textPrice = document.createElement( 'p' );
        textPrice.setAttribute("class", "photographer__price");
        textPrice.textContent = pricePerDay;

        article.append(divLink, divDescription);
        divLink.append(imgPhotographer, h2);
        divDescription.append(textLocation, textTagLine, textPrice);
        return (article);
    }

    const getUserDetailsDOM = () => {
        const pictureSrc = '.' + picture;

        const divDetails = document.createElement( 'div' );
        divDetails.setAttribute("class", "photographer__details");

        const title = document.createElement( 'h1' );
        title.setAttribute("class", "h1 photographer__title photographer__title--xlarge");
        title.textContent = name;

        const divDescription = document.createElement( 'div' );
        divDescription.setAttribute("class", "");

        const textLocation = document.createElement( 'p' );
        textLocation.setAttribute("class", "");
        textLocation.textContent = location;

        const textTagLine = document.createElement( 'p' );
        textTagLine.setAttribute("class", "");
        textTagLine.textContent = description;

        divDetails.append(title, divDescription);
        divDescription.append(textLocation, textTagLine);

        const img = document.createElement( 'img' );
        setAttributes(img, {"src" : pictureSrc, "alt" : name, "class" : "photographer__img" });

        const button = document.createElement( 'button' );
        button.setAttribute("class", "button");
        button.textContent = "Contactez-moi";

        return ({divDetails, button, img});

    }


    return { name, picture, id, location, description, pricePerDay, getUserCardDOM, getUserDetailsDOM }
}


export { photographerFactory };