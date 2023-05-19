// import * as debounce from "lodash.debounce";
import displayItem, { loadLocalItems } from "./display-item.js";
import { loadFromStore, saveToStore } from "./local-store.js";
import { modalToggler } from "./modal-handler.js";
import { searchReaders } from "./search-readers.js";

// Items UI
let itemsEl = document.getElementById("items"),
  itemTemplateEl = document.querySelector("#templates"),
  searchInputEl = document.getElementById("search");

// Load from local storage
export const loadItemsHandler = () => {
  // search items by title
  loadLocalItems(loadFromStore, itemsEl, itemTemplateEl);

  // loadLocalItems(filteredItems, itemsEl, itemTemplateEl);
  searchReaders(itemsEl, searchInputEl);
};

/**
 *
 * @param {HTMLButtonElement} addItemBtnEl
 */
export const toggleAddItemBtnStatus = (addItemBtnEl) => {
  if (!addItemBtnEl) return;
  if (addItemBtnEl.disabled === true) {
    addItemBtnEl.disabled = false;
    addItemBtnEl.style.opacity = 1;
    addItemBtnEl.innerText = "Add Item";
  } else {
    addItemBtnEl.disabled = true;
    addItemBtnEl.style.opacity = 0.5;
    addItemBtnEl.innerText = "Adding...";
  }
};

function isValidUrl(urlStr) {
  let url;
  try {
    url = new URL(urlStr);
  } catch (e) {
    return false;
  }

  return !!url;
}

/**
 *
 * @param {HTMLInputElement} itemEl
 * @param {HTMLDivElement} modalEl
 * @returns void
 */
const addItem = async (itemEl, modalEl, addItemBtnEl) => {
  try {
    /// start loader
    toggleAddItemBtnStatus(addItemBtnEl);

    let url = itemEl.value;

    /// handle errors gracefully
    if (!url || url === "") {
      // @TODO: show popup, with error message
      itemEl.focus();
      toggleAddItemBtnStatus(addItemBtnEl);
      return;
    }

    // ensure url has a protocol before proceeding
    const hasProtocol = url.includes("http://") || url.includes("https://");
    if (!hasProtocol) {
      url = `https://${url}`;
    }

    // ensure url is a valid url
    if (!isValidUrl(url)) {
      throw new Error("Invalid url structure");
    }

    const response = await window.electronAPI.setItemUrl(url);

    if (response) {
      // display fetched items to the page
      if (itemsEl && itemTemplateEl) {
        displayItem(response, itemsEl, itemTemplateEl, true);
        saveToStore(response);
      }

      // reset loader
      toggleAddItemBtnStatus(addItemBtnEl);

      // @TODO: show success message
    }

    /// clean input and close the modal
    itemEl.value = "";
    modalToggler(modalEl);
  } catch (error) {
    // @TODO: show error message
    console.error(error.message);
    itemEl.select();
    toggleAddItemBtnStatus(addItemBtnEl);
  }
};

/**
 *
 * @param {HTMLInputElement} itemEl
 * @param {HTMLButtonElement} addItemEl
 * @param {HTMLDivElement} modalEl
 */
export const createItem = (itemEl, addItemEl, modalEl) => {
  addItemEl.addEventListener("click", (event) => {
    event.stopPropagation();
    addItem(itemEl, modalEl, addItemEl);
  });

  itemEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      addItem(itemEl, modalEl, addItemEl);
    }
  });
  itemEl.addEventListener("click", (event) => event.stopPropagation());
};
