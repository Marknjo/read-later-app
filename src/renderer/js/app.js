let showModalEl = document.getElementById("show-modal");
let closeModalBtnEl = document.getElementById("close-modal");
let modalEl = document.querySelector(".modal");

const toggleBtn = (modalEl) => {
  if (modalEl.classList.contains("show-modal")) {
    modalEl.classList.remove("show-modal");
  } else {
    modalEl.classList.add("show-modal");
  }
};

if (showModalEl && modalEl) {
  showModalEl.addEventListener("click", (e) => {
    toggleBtn(modalEl);
  });
}

if (showModalEl && modalEl) {
  closeModalBtnEl.addEventListener("click", (e) => {
    toggleBtn(modalEl);
  });
}
