/**
 *
 * @param {HTMLDivElement} modalEl
 *
 */
export const modalToggler = (modalEl) => {
  if (modalEl.classList.contains("show-modal")) {
    modalEl.classList.remove("show-modal");
  } else {
    modalEl.classList.add("show-modal");
  }
};

/**
 *
 * @param {HTMLDivElement} modalEl
 * @param {HTMLButtonElement} showModalEl
 * @param {HTMLButtonElement} closeModalBtnEl
 * @param {HTMLInputElement} itemUrl
 */
export function toggleModal(modalEl, showModalEl, closeModalBtnEl, itemUrl) {
  itemUrl.focus();
  showModalEl.addEventListener("click", () => {
    modalToggler(modalEl);
  });

  closeModalBtnEl.addEventListener("click", (event) => {
    event.stopPropagation();
    modalToggler(modalEl);
  });

  document.body.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      modalToggler(modalEl);
    }
  });
  modalEl.addEventListener("click", (event) => {
    modalToggler(modalEl);
  });
}
