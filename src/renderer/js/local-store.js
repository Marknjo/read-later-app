// add items to storage

const storedItems = localStorage.getItem("readit-items");

const parsedItems = (getEntries = false, getUrl = false) => {
  if (!storedItems) return [];

  const itemEntries = JSON.parse(storedItems);

  if (getEntries) return itemEntries;

  if (getUrl) return [...new Map(itemEntries).keys()];

  return [...new Map(itemEntries).values()].reverse();
};

export const loadFromStore = parsedItems();
export const loadUrlsFromStore = parsedItems(false, true);

// persist to storage

export const saveToStore = (item, update = false) => {
  const oldData = parsedItems(true);
  const newData = [item.url, item];
  const mergedData = [newData, ...oldData];
  const data = [...new Map(mergedData).entries()];

  localStorage.setItem("readit-items", JSON.stringify(update ? item : data));
};

export const deleteFromStore = (url) => {
  if (loadFromStore.length === 0) return;

  const filteredItems = parsedItems(true).filter((item) => item.at(0) !== url);

  saveToStore(filteredItems, true);
};
