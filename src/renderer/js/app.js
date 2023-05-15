/// handle modal toggling
import { toggleModal } from "./modal-handler.js";

// modal elements
let showModalEl = document.getElementById("show-modal"),
  closeModalBtnEl = document.getElementById("close-modal"),
  modalEl = document.querySelector(".modal");

/// handle showing of modal
if ((showModalEl, closeModalBtnEl, modalEl)) {
  toggleModal(modalEl, showModalEl, closeModalBtnEl);
}
