// add items to storage

const storedItems = localStorage.getItem("readit-items");

const parsedItems = (getEntries = false, getTitles = false) => {
  if (!storedItems) return [];

  const itemEntries = JSON.parse(storedItems);

  if (getEntries) return itemEntries;

  if (getTitles) return [...new Map(itemEntries).keys()];

  return [...new Map(itemEntries).values()];
};

export const loadFromStore = parsedItems();
export const loadTitlesFromStore = parsedItems(false, true);

// persist to storage

export const saveToStore = (item, update = false) => {
  const data = [
    ...new Map([[item.title, item], ...parsedItems(true)]).entries(),
  ];

  localStorage.setItem("readit-items", JSON.stringify(update ? item : data));
};

export const deleteFromStore = (title) => {
  if (loadFromStore.length === 0) return;

  const filteredItems = parsedItems(true).filter(
    (item) => item.at(0) !== title
  );

  saveToStore(filteredItems, true);
};
