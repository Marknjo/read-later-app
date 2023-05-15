export const modalToggler = (modalEl) => {
  modalEl?.firstElementChild.focus();
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
 */
export function toggleModal(modalEl, showModalEl, closeModalBtnEl) {
  showModalEl.addEventListener("click", (e) => {
    modalToggler(modalEl);
  });

  closeModalBtnEl.addEventListener("click", (e) => {
    modalToggler(modalEl);
  });
}
