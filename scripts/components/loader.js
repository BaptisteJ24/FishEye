const hideLoader = () => {
    const loader = document.querySelector(".loader-container");
    loader.classList.add("loader--hidden");
};

export { hideLoader };