function photographerFactory(data) {
    const { name, portrait, id, city, country, price, tagline } = data;

    const picture = `./assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const description = `${tagline}`;
    const pricePerDay = `${price}€/jour`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.setAttribute("class", "article photographer__article");

        const divLink = document.createElement( 'div' );
        divLink.setAttribute("class", "photographer__link");
        divLink.addEventListener("click", () => {
            window.location.href = `./views/photographer.html?id=${id}`;
        });

        const img = document.createElement( 'img' );
        setAttributes(img, {"src" : picture, "alt" : name, "class" : "photographer__img" });

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
        divLink.append(img, h2);
        divDescription.append(textLocation, textTagLine, textPrice);
        return (article);
    }
    return { name, picture, id, location, description, pricePerDay, getUserCardDOM }
}