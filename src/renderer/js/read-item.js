import { loadFromStore } from "./local-store.js";

export function readit() {
  if (!loadFromStore.length) return;

  let selectedItem = document.querySelector("#items .selected");

  const contentUrl = selectedItem.dataset.readitUrl;

  const readerWin = window.open(
    contentUrl,
    "",
    `
    maxWidth=2000,
    maxHeight=2000,
    width=1200,
    height=800,
    backgroundColor=#DEDEDE,
    nodeIntegration=0,
    contextIsolation=1
  `
  );

  /* @TODO: Implement a better mode of handling js */
  readerWin.eval(`alert('Hello from items.js')`);
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
