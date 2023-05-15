import { modalToggler } from "./modal-handler.js";

/**
 *
 * @param {HTMLInputElement} itemEl
 * @param {HTMLDivElement} modalEl
 * @returns void
 */
const addItem = (itemEl, modalEl) => {
  const url = itemEl.value;

  /// handle errors gracefully
  if (!url) return;

  console.log(url);

  /// clean input and close the modal
  itemEl.value = "";
  itemEl.focus();
  modalToggler(modalEl);
};

/**
 *
 * @param {HTMLInputElement} itemEl
 * @param {HTMLButtonElement} addItemEl
 * @param {HTMLDivElement} modalEl
 */
export const createItem = (itemEl, addItemEl, modalEl) => {
  addItemEl.addEventListener("click", () => {
    addItem(itemEl, modalEl);
  });

  itemEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      addItem(itemEl, modalEl);
    }
  });
};
