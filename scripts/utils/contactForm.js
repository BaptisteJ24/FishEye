const displayModal = async () => {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

const closeModal = async () => {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


export { displayModal, closeModal };
