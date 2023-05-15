/// handle modal toggling
import { createItem } from "./create-item.js";
import { toggleModal } from "./modal-handler.js";

// modal elements
let showModalEl = document.getElementById("show-modal"),
  closeModalBtnEl = document.getElementById("close-modal"),
  modalEl = document.querySelector(".modal");

// Items
let itemUrlEl = document.getElementById("url"),
  addItemEl = document.getElementById("add-item");

/// handle showing of modal
if ((showModalEl, closeModalBtnEl, modalEl)) {
  toggleModal(modalEl, showModalEl, closeModalBtnEl);
}

/// Handle add item to the UI
if (itemUrlEl && addItemEl && modalEl) {
  console.log("Load");

  console.log(itemUrlEl.focus());

  createItem(itemUrlEl, addItemEl, modalEl);
}
