/// handle modal toggling
import { createItem, loadItemsHandler } from './create-item.js'

import {
  selectFirstReaderItemOnPageLoad,
  selectedReaderItemByArrowsHandler
} from './display-item.js'
import { toggleModal, toggleModalFromMenu } from './modal-handler.js'
import { readItFromBrowser, readSelectedItemOnMenuClick, readitOnEnter } from './read-item.js'
import { menuActivateSearchItem } from './search-readers.js'

// modal elements
let showModalEl = document.getElementById('show-modal'),
  closeModalBtnEl = document.getElementById('close-modal'),
  modalEl = document.querySelector('.modal')

// Items Input
let itemUrlEl = document.getElementById('url'),
  addItemEl = document.getElementById('add-item')

/// load search input element
let searchInputEl = document.getElementById('search')

/// handle showing of modal
if (itemUrlEl && showModalEl && closeModalBtnEl && modalEl) {
  toggleModalFromMenu(modalEl)
  toggleModal(modalEl, showModalEl, closeModalBtnEl, itemUrlEl)
}

/// Handle add item to the UI
if (itemUrlEl && addItemEl && modalEl && searchInputEl) {
  createItem(itemUrlEl, addItemEl, modalEl)
  loadItemsHandler(searchInputEl)
}

// handle update of ui of the selected element by moving arrows
selectFirstReaderItemOnPageLoad()

document.addEventListener('DOMContentLoaded', () => {
  selectedReaderItemByArrowsHandler()
  /// Reader
  readitOnEnter()
  readSelectedItemOnMenuClick()
  readItFromBrowser()

  // Activate search
  searchInputEl && menuActivateSearchItem(searchInputEl)
})

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  window.electronAPI.contextMenuHandler()
})
