import { getCurrentPage } from "../utils/utils.js";
import * as photographerPage from "../dom/pages/photographer.js";
import { loadEvents } from "../main.js";

if (getCurrentPage() === "photographer") {

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
        dropdownButton.setAttribute("aria-expanded", dropdownChevron.classList.contains("dropdown__expanded"));
        if (dropdownChevron.classList.contains("dropdown__expanded")) {
            dropdownButton.setAttribute("aria-label", "Close sort list");
            // Vérify if the new element on which the focus is made is in the dropdown list or not

            dropdownButton.addEventListener("focusout", focusOutDropdown);
        }
        else {
            dropdownButton.setAttribute("aria-label", "Open sort list");
        }
    };

    const focusOutDropdown = (e) => {
        const isInDropdown = listItems.some((item) => item.contains(e.relatedTarget));
        // If the new element is not in the dropdown list, hide the list and reset the button
        if (!isInDropdown) {
            toggleListVisibility();
            dropdownButton.removeEventListener("focusout", focusOutDropdown);
        }
    };

    // event listener onclick in dropdown
    const handleDropdownEvent = (e) => {
        if (e.type === "click" || (e.type === "keydown" && (e.key === "Enter" || e.key === " "))) {
            dropdownButton.removeEventListener("focusout", focusOutDropdown);
            toggleListVisibility();
        }
    };
    dropdownButton.addEventListener("click", handleDropdownEvent);
    dropdownButton.addEventListener("keydown", handleDropdownEvent);


    // function to select dropdown item
    const selectDropdown = (e) => {
        dropdownSelected.setAttribute("aria-label", listItemObj[e.target.dataset.value].value);
        dropdownSelected.dataset.value = listItemObj[e.target.dataset.value].value;
        dropdownSelected.dataset.text = listItemObj[e.target.dataset.value].text;
        dropdown__placeholder.innerText = listItemObj[e.target.dataset.value].text;
    };

    // function to change actual dropdown item selected by previousItem selected.
    const changeItemsInDropdown = (e, previousItem) => {
        e.target.setAttribute("aria-label", previousItem.value);
        e.target.dataset.value = previousItem.value;
        e.target.dataset.text = previousItem.text;
        e.target.innerText = previousItem.text;
    };

    // event listener onclick in dropdown list items
    listItemsWithBorder.forEach(item => {
        item.addEventListener("click", async e => {
            const previousItem = listItemObj[dropdownSelected.dataset.value];
            selectDropdown(e);
            changeItemsInDropdown(e, previousItem);
            await photographerPage.initMedia(dropdownSelected.dataset.value);
            await photographerPage.initPhotographerTotalLikesAndPrice();
            loadEvents();
        });

        item.addEventListener("keydown", async e => {
            if (e.key === "Enter" || e.key === "Space") {
                const previousItem = listItemObj[dropdownSelected.dataset.value];
                selectDropdown(e);
                changeItemsInDropdown(e, previousItem);
                await photographerPage.initMedia(dropdownSelected.dataset.value);
                await photographerPage.initPhotographerTotalLikesAndPrice();
                loadEvents();
            }
        });
    });
}