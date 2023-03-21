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

    /**
     * description: toggle the dropdown list visibility
     */
    const toggleListVisibility = () => {
        listItemsWithBorder.forEach(item => item.classList.toggle("hide"));
        dropdownChevron.classList.toggle("dropdown__expanded");
        dropdownButton.setAttribute("aria-expanded", dropdownChevron.classList.contains("dropdown__expanded"));
        // If the dropdown is expanded, add the focusout event listener to the button
        if (dropdownChevron.classList.contains("dropdown__expanded")) {
            dropdownButton.setAttribute("aria-label", "Close sort list");
            dropdownButton.addEventListener("focusout", focusOutDropdown);
        }
        else {
            dropdownButton.setAttribute("aria-label", "Open sort list");
        }
    };

    /**
     * description: hide the dropdown list if the focus is outside of the dropdown
     */
    const focusOutDropdown = (e) => {
        const isInDropdown = listItems.some((item) => item.contains(e.relatedTarget));
        // If the new element is not in the dropdown list, hide the list and reset the button
        if (!isInDropdown) {
            toggleListVisibility();
            dropdownButton.removeEventListener("focusout", focusOutDropdown);
        }
    };

    /**
     * description: handle the dropdown button click and keydown events
     */
    const handleDropdownEvent = (e) => {
        if (e.type === "click" || (e.type === "keydown" && (e.key === "Enter" || e.key === " "))) {
            dropdownButton.removeEventListener("focusout", focusOutDropdown);
            toggleListVisibility();
        }
    };
    dropdownButton.addEventListener("click", handleDropdownEvent);
    dropdownButton.addEventListener("keydown", handleDropdownEvent);


    /**
     * description: select the dropdown item
     */
    const selectDropdown = (e) => {
        dropdownSelected.setAttribute("aria-label", listItemObj[e.target.dataset.value].value);
        dropdownSelected.dataset.value = listItemObj[e.target.dataset.value].value;
        dropdownSelected.dataset.text = listItemObj[e.target.dataset.value].text;
        dropdown__placeholder.innerText = listItemObj[e.target.dataset.value].text;
    };

    /**
     * description: change the actual dropdown items with the previous selected item
     */
    const changeItemsInDropdown = (e, previousItem) => {
        e.target.setAttribute("aria-label", previousItem.value);
        e.target.dataset.value = previousItem.value;
        e.target.dataset.text = previousItem.text;
        e.target.innerText = previousItem.text;
    };

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