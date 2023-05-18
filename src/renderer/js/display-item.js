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
