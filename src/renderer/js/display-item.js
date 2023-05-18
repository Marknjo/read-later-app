/**
 *
 * @param {{title: string, screenshot: string, url: string }} response
 * @param {HTMLDivElement} itemsWrapperEl
 * @param {HTMLTemplateElement} itemTemplate
 */
export default function displayItem(response, itemsWrapperEl, itemTemplate) {
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

  itemsWrapperEl.insertAdjacentElement("afterbegin", displayElement);
}
