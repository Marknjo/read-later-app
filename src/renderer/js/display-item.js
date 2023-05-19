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
 * Attach  a listener to toggle selected item
 * @param {HTMLElement} itemEl
 */
export function selectItem(itemEl) {
  const toggleSelectedItem = (el) => {
    el.classList.toggle("selected");
  };

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

  // itemEl.addEventListener("mouseleave", () => {
  //   itemEl.classList.remove("selected");
  // });
}
