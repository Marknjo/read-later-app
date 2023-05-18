import { modalToggler } from "./modal-handler.js";

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
      toggleAddItemBtnStatus(addItemBtnEl);
      return;
    }

    // ensure url has a protocol before proceeding
    const hasProtocol = url.includes("http://") || url.includes("https://");
    if (!hasProtocol) {
      url = `https://${url}`;
    }

    // ensure url is a valid url
    if (!!new URL(url)) {
      throw new Error("Invalid url structure");
    }

    const response = await window.electronAPI.setItemUrl(url);

    if (response) {
      console.log(response);

      // reset loader
      toggleAddItemBtnStatus(addItemBtnEl);

      // @TODO: show success message
    }

    /// clean input and close the modal
    itemEl.value = "";
    itemEl.focus();
    modalToggler(modalEl);
  } catch (error) {
    // @TODO: show error message
    console.error(error.message);

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
