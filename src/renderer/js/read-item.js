import { loadFromStore } from "./local-store.js";
import { getReaderContent } from "./readit-js.js";

export function readit() {
  if (!loadFromStore.length) return;

  let selectedItem = document.querySelector("#items .selected");

  const contentUrl = selectedItem.dataset.readitUrl;

  const readerWin = window.open(contentUrl, "modal");

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
