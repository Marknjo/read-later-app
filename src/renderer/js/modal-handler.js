const toggleBtn = (modalEl) => {
  if (modalEl.classList.contains("show-modal")) {
    modalEl.classList.remove("show-modal");
  } else {
    modalEl.classList.add("show-modal");
  }
};

export function toggleModal(modalEl, showModalEl, closeModalBtnEl) {
  showModalEl.addEventListener("click", (e) => {
    toggleBtn(modalEl);
  });

  closeModalBtnEl.addEventListener("click", (e) => {
    toggleBtn(modalEl);
  });
}
