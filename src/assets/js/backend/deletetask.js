import metPopulator from '../frontend/updater';

const propDelete = {
  container: document.getElementsByTagName('ul')[0],
  items: document.getElementsByTagName('li'),
};

const metDelete = {

  deleteItem(index) {
    const li = propDelete.items[index];

    const newDict = metPopulator.getStorage();
    newDict.splice(index, 1);

    localStorage.clear();
    for (let i = 0; i < newDict.length; i += 1) {
      const obj = { description: newDict[i][0], status: newDict[i][1], index: i };
      metPopulator.updateStorage(obj);
      console.log('the object ', i, ' is ', obj);
    }

    li.remove();

    metDelete.updateListeners();
  },

  updateListeners() {
    metPopulator.updateDOM;
  },
};

export default metDelete;
