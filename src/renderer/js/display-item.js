import { loadFromStore, loadTitlesFromStore } from "./local-store.js";

/**
 *
 * @param {{title: string, screenshot: string, url: string }} response
 * @param {HTMLDivElement} itemsWrapperEl
 * @param {HTMLTemplateElement} itemTemplate
 * @param {boolean} isNewItem
 */
export default function displayItem(
  response,
  itemsWrapperEl,
  itemTemplate,
  isNewItem = false
) {
  /** @type {DocumentFragment} insertedDisplayEl */
  const insertedDisplayEl = document.importNode(itemTemplate.content, true);

  /**   @type {HTMLElement} displayElement */
  const displayElement = insertedDisplayEl.firstElementChild;

  /**   @type {HTMLImageElement} imgEl */
  const imgEl = displayElement.firstElementChild;

  /**   @type {HTMLElement} h2El */
  const h2El = displayElement.lastElementChild;

  imgEl.src = response.screenshot;
  h2El.innerText = response.title;
  displayElement.href = response.url;

  selectItem(displayElement);

  // show to the ui
  if (isNewItem) {
    loadTitlesFromStore.includes(response.title) ||
      itemsWrapperEl.insertAdjacentElement("afterbegin", displayElement);
  } else {
    itemsWrapperEl.insertAdjacentElement("afterbegin", displayElement);
  }
}

/**
 *
 * @param {[{title: string, screenshot: string, url: string }]} localItems
 * @param {HTMLDivElement} itemsWrapperEl
 * @param {HTMLTemplateElement} itemTemplate
 */
export function loadLocalItems(localItems, itemsWrapperEl, itemTemplate) {
  localItems.forEach((items) =>
    displayItem(items, itemsWrapperEl, itemTemplate)
  );
}

/**
 * Helper to toggle selected reader item
 * @param {HTMLElement} itemEl
 */
const toggleSelectedItem = (itemEl) => {
  itemEl.classList.toggle("selected");
};

/**
 * Attach  a listener to toggle selected item
 * @param {HTMLElement} itemEl
 */
export function selectItem(itemEl) {
  itemEl.addEventListener("click", (event) => {
    const selectedItem = itemEl.parentElement.querySelector(".selected");

    // Remove any item that is already selected on selecting a new item
    !!selectedItem && toggleSelectedItem(selectedItem);

    // add selected class to read-item element,
    // 1. if either image or h2 is selected
    // 2. Else when the read item itself is selected
    if (!event.target.classList.contains("read-item")) {
      toggleSelectedItem(event.target.parentElement);
    } else {
      toggleSelectedItem(event.target);
    }
  });
}

export function selectFirstReaderItemOnPageLoad() {
  document.addEventListener("DOMContentLoaded", () => {
    highlightReaderItem();
  });
}

export function selectedReaderItemByArrowsHandler() {
  let selectedEl;

  document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      selectedEl = document.querySelector("#items > .read-item.selected");
    }

    if (event.key === "ArrowDown") {
      return changeSelectedByArrow("ArrowDown", selectedEl);
    }

    if (event.key === "ArrowUp") {
      return changeSelectedByArrow("ArrowUp", selectedEl);
    }
  });
}

/**
 *
 * @param {'ArrowDown' | 'ArrowUp'} direction
 * @param {HTMLElement} itemEl
 */
function changeSelectedByArrow(direction, itemEl) {
  const selectedItem = itemEl.parentElement.querySelector(".selected");

  if (direction === "ArrowDown") {
    const nextSib = selectedItem.nextElementSibling;
    if (nextSib) {
      toggleSelectedItem(itemEl);
      toggleSelectedItem(nextSib);
      return;
    }
    return;
  }

  if (direction === "ArrowUp") {
    const prevSib = selectedItem.previousElementSibling;
    if (prevSib) {
      toggleSelectedItem(itemEl);
      toggleSelectedItem(prevSib);
      return;
    }
    return;
  }
}

function highlightReaderItem() {
  const allReaderItems = Array.from(
    document.querySelectorAll("#items > .read-item")
  );

  if (allReaderItems.length > 0) {
    allReaderItems.at(0).classList.add("selected");
  }
}
