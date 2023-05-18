/// handle modal toggling
import { createItem } from "./create-item.js";
import { toggleModal } from "./modal-handler.js";

// modal elements
let showModalEl = document.getElementById("show-modal"),
  closeModalBtnEl = document.getElementById("close-modal"),
  modalEl = document.querySelector(".modal");

// Items Input
let itemUrlEl = document.getElementById("url"),
  addItemEl = document.getElementById("add-item");

/// handle showing of modal
if (itemUrlEl && showModalEl && closeModalBtnEl && modalEl) {
  toggleModal(modalEl, showModalEl, closeModalBtnEl, itemUrlEl);
}

/// Handle add item to the UI
if (itemUrlEl && addItemEl && modalEl) {
  createItem(itemUrlEl, addItemEl, modalEl);
}
