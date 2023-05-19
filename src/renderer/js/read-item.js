import { loadFromStore } from "./local-store.js";

export function readit() {
  if (!loadFromStore.length) return;

  let selectedItem = document.querySelector("#items .selected");

  const contentUrl = selectedItem.dataset.readitUrl;

  console.log("Opening Item ", contentUrl);
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
