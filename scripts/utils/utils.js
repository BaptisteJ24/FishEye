/**
 * description : set attributes to an element
 * @param {HTMLElement} el - element to set attributes
 * @param {Object} attrs - attributes to set. It's an object with key and value.
 * @returns {HTMLElement} - element with attributes
 * @example setAttributes(img, {"src" : ./images/img.png, "class" : "img" });
 */
function setAttributes(el, attrs) {
    if (typeof attrs !== 'object') {
        throw new Error('attrs is not an object');
    }
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// const testArrowFunction = (string) => string.toUpperCase();

// params: string. Return: array
const getAllData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(`Erreur lors de la récupération des données : ${error}`);
    }
}

const getDataByProperty = async (url, property) => { // params: string, string. Return: array
    try {
        const data = await getAllData(url);
        const dataByProperty = data[property];
        return dataByProperty;
    }
    catch (error) {
        console.error(`Erreur lors de la récupération des données : ${error}`);
    }
}

const getDataById = async (url, property = null, id, propertyId = 'id') => { // params: string, string, number, string. Return: array
    try {
        if (property === null) {
            const data = await getAllData(url);
            const dataById = Object.values(data).map((property) => property.filter((obj) => obj[propertyId] === id)).flat();

            return dataById;
        }

        const dataByProperty = await getDataByProperty(url, property);
        const dataById = dataByProperty.filter((obj) => obj[propertyId] === JSON.parse(id));

        return dataById;
    }
    catch (error) {
        console.error(`Erreur lors de la récupération des données : ${error}`);
    }
}

export { setAttributes, getAllData, getDataByProperty, getDataById };