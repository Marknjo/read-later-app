/**
 *
 * @param {HTMLElement} readerEl
 * @param {string} title
 * @param {string} searchTerm
 */
const searchItem = (readerEl, title, searchTerm) => {
  let matches = title.toLowerCase().includes(searchTerm);

  if (matches) {
    readerEl.classList.add("show");
    readerEl.classList.remove("hide");
  } else {
    readerEl.classList.add("hide");
    readerEl.classList.remove("show");
  }
};

/**
 *
 * @param {HTMLElement} itemsEl
 * @param {HTMLInputElement} searchInputEl
 */
export const searchReaders = (itemsEl, searchInputEl) => {
  let readerItems = Array.from(itemsEl.querySelectorAll(".read-item"));
  searchInputEl.addEventListener("keyup", (event) => {
    readerItems.forEach((readerEl) => {
      let searchTerm = searchInputEl.value.trim();
      let title = readerEl.querySelector("h2").innerText;

      if (
        searchTerm !== "" &&
        event.key !== "Backspace" &&
        searchTerm.length > 2
      ) {
        // @TODO: implement debouncing
        searchItem(readerEl, title, searchTerm);
      }

      if (event.key === "Enter") {
        searchItem(readerEl, title, searchTerm);
        searchInputEl.select();
      }

      searchInputEl.addEventListener("focusout", () => {
        searchInputEl.focus();
      });

      if (event.key === "Backspace") {
        searchItem(readerEl, title, searchTerm);
      }
    });
  });
};
