const propPopulator = {
  container: document.getElementsByTagName('ul')[0],
};

const metPopulator = {
  updateStorage(obj) {
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      const key = Object.keys(obj)[i];
      const arr = localStorage.getItem(key) ? localStorage.getItem(key).split(',') : [];
      arr.push(obj[key]);
      localStorage.setItem(key, arr);
    }
  },

  sortStorage() {
    const descr = localStorage.getItem('description') ? localStorage.getItem('description').split(',') : [];
    const status = localStorage.getItem('status') ? localStorage.getItem('status').split(',') : [];
    const index = localStorage.getItem('index') ? localStorage.getItem('index').split(',') : [];
    const dictionary = [];
    for (let i = 0; i < index.length; i += 1) {
      dictionary[i] = [descr[i], status[i], index[i]];
    }
    dictionary.sort((a, b) => ((a[2] > b[2]) ? 1 : -1));
    return dictionary;
  },

  updateDOM() {
    const items = metPopulator.sortStorage();
    for (let i = 0; i < items.length; i += 1) {
      const nameStr = items[i][0];
      const checkBool = items[i][1] === 'true';
      const name = propPopulator.container.children[i].firstChild.lastChild;
      const checkbox = propPopulator.container.children[i].firstChild.firstChild;
      checkbox.checked = checkBool;
      name.textContent = nameStr;
    }
  },
};

export default metPopulator;