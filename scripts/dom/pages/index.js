import { getDataByProperty } from "../../utils/utils.js";
import { photographerFactory } from "../factories/photographer.js";

/**
 * description : get all photographers form photographers.json file
 */
const getPhotographers = async () => {
    try {
        const photographersArray = await getDataByProperty("./data/photographers.json", "photographers");
        return ({ photographers: photographersArray });
    }
    catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
    }
};

const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographers__section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

const initPhotographers = async () => {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};


export { initPhotographers };


