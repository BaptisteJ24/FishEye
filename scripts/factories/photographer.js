function photographerFactory(data) {
    const { name, portrait, id, city, country, price, tagline } = data;

    const picture = `assets/photographers/${portrait}`;
    const location = `${city}, ${country}`;
    const description = `${tagline}`;
    const pricePerDay = `${price}€/jour`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement( 'p' );
        p.textContent = location;
        const p2 = document.createElement( 'p' );
        p2.textContent = description;
        const p3 = document.createElement( 'p' );
        p3.textContent = pricePerDay;
        article.append(img, h2, p, p2, p3);
        return (article);
    }
    return { name, picture, location, description, pricePerDay, getUserCardDOM }
}