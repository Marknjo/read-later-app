/**
 *
 * @param {HTMLDivElement} modalEl
 */
export const modalToggler = (modalEl) => {
  if (modalEl.classList.contains('show-modal')) {
    modalEl.classList.remove('show-modal')
  } else {
    modalEl.classList.add('show-modal')

    /** @type {HTMLInputElement} */
    const inputEl = modalEl.firstElementChild
    inputEl.focus()
  }
}

/**
 *
 * @param {HTMLDivElement} modalEl
 * @param {HTMLButtonElement} showModalEl
 * @param {HTMLButtonElement} closeModalBtnEl
 */
export function toggleModal(modalEl, showModalEl, closeModalBtnEl) {
  showModalEl.addEventListener('click', () => {
    modalToggler(modalEl)
  })

  closeModalBtnEl.addEventListener('click', (event) => {
    event.stopPropagation()
    modalToggler(modalEl)
  })

  document.body.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      modalToggler(modalEl)
    }
  })
  modalEl.addEventListener('click', () => {
    modalToggler(modalEl)
  })
}

/**
 *
 * @param {HTMLDivElement} modalEl
 */
export function toggleModalFromMenu(modalEl) {
  window.electronAPI.showAddItemModal(() => {
    modalToggler(modalEl)
  })
}
