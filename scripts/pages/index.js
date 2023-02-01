async function getPhotographers() {
  //  Requête fetch pour récupérer les données des photographes dans data/photographers.json
  return fetch('../../data/photographers.json')
    .then(response => response.json())
    .then(data => {
      let photographers = data.photographers;
      let photographersArray = [];

      photographers.forEach(photographer => {
        let obj = {
          name: photographer.name,
          id: photographer.id,
          city: photographer.city,
          country: photographer.country,
          tagline: photographer.tagline,
          price: photographer.price,
          portrait: photographer.portrait
        };
        photographersArray.push(obj);
      });

      console.log(photographersArray);
      return ({
        photographers: photographersArray
      })
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données : ', error);
    });
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();