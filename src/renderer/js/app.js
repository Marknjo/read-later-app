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

// Items UI
let itemsEl = document.getElementById("items");
let itemTemplateEl = document.querySelector("#templates");

/// handle showing of modal
if ((showModalEl, closeModalBtnEl, modalEl)) {
  toggleModal(modalEl, showModalEl, closeModalBtnEl);
}

/// Handle add item to the UI
if (itemUrlEl && addItemEl && modalEl) {
  createItem(itemUrlEl, addItemEl, modalEl);
}

if (itemsEl && itemTemplateEl) {
  console.log(itemTemplateEl);
  console.log(itemsEl);
}
