import { loadPhotographerPage } from "../pages/photographer.js";

// DOM elements
const dropdownButton = document.querySelector(".dropdown__list"),
    dropdownChevron = document.querySelector(".dropdown__chevron"),
    listItems = Array.from(document.querySelectorAll(".dropdown__list-item")),
    listItemsWithBorder = document.querySelectorAll(".dropdown__list-item--border-top"),
    dropdownSelected = document.getElementById("dropdown__selected"),
    dropdown__placeholder = dropdownSelected.querySelector(".dropdown__placeholder");

// Dropdown object with foreach sort option.
const listItemObj = listItems.reduce((acc, item) => {
    acc[item.dataset.value] = {
        value: item.dataset.value,
        text: item.dataset.text
    };
    return acc;
}, {});

// function to toggle dropdown list visibility
const toggleListVisibility = () => {
    listItemsWithBorder.forEach(item => item.classList.toggle("hide"));
    dropdownChevron.classList.toggle("dropdown__expanded");
    dropdownButton.setAttribute("aria-expanded", dropdownChevron.classList.contains("expanded"));
}
// event listener onclick in dropdown
dropdownButton.addEventListener("click", toggleListVisibility);

// function to select dropdown item
const selectDropdown = (e) => {
    dropdownSelected.setAttribute("aria-label", listItemObj[e.target.dataset.value].value);
    dropdownSelected.dataset.value = listItemObj[e.target.dataset.value].value;
    dropdownSelected.dataset.text = listItemObj[e.target.dataset.value].text;
    dropdown__placeholder.innerText = listItemObj[e.target.dataset.value].text;
}

// function to change actual dropdown item selected by previousItem selected.
const changeItemsInDropdown = (e, previousItem) => {
    e.target.setAttribute("aria-label", previousItem.value);
    e.target.dataset.value = previousItem.value;
    e.target.dataset.text = previousItem.text;
    e.target.innerText = previousItem.text;
}

// event listener onclick in dropdown list items
listItemsWithBorder.forEach(item => {
    item.addEventListener("click", e => {
        const previousItem = listItemObj[dropdownSelected.dataset.value];
        selectDropdown(e);
        changeItemsInDropdown(e, previousItem);
        loadPhotographerPage(dropdownSelected.dataset.value);
    });
});

