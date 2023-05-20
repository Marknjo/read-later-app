import { deleteItemFromUI } from "./display-item.js";
import { deleteFromStore, loadFromStore } from "./local-store.js";
import { getReaderContent } from "./readit-js.js";

export function readit() {
  if (!loadFromStore.length) return;

  let selectedItem = document.querySelector("#items .selected");
  const itemsEl = selectedItem.parentElement;

  const contentUrl = selectedItem.dataset.readitUrl;

  const readerWin = loadReader(contentUrl, itemsEl);

  /* @TODO: Implement a better mode of handling js */
}

/**
 * open the readit item if is selected and user clicks enter
 */
export function readitOnEnter() {
  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      readit();
    }
  });
}

export function readSelectedItemOnMenuClick() {
  window.electronAPI.readSelectedItem(() => {
    readit();
  });
}

/**
 * set currently loaded url
 * @param {string} contentUrl
 * @returns {Window}
 */
function loadReader(contentUrl, itemsEl) {
  /// delete item

  const readerWin = window.open(contentUrl, "modal");
  deleteItemFromUiAndStore(contentUrl, itemsEl, readerWin);
  return readerWin;
}

/**
 *
 * @param {string} contentUrl
 * @param {HTMLElement} itemsEl
 * @param {Window} readerWin
 */
function deleteItemFromUiAndStore(contentUrl, itemsEl, readerWin) {
  window.electronAPI.deleteSelectedItem(() => {
    readerWin.frames.close();
    deleteItemFromUI(itemsEl, contentUrl);
    deleteFromStore(contentUrl);
  });
}

export function readItFromBrowser() {
  // @TODO: Refactor this code

  window.electronAPI.openSelectedInBrowser(() => {
    if (!loadFromStore.length) return;
    let selectedItem = document.querySelector("#items .selected");
    return selectedItem.dataset.readitUrl;
  });
}
