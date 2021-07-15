import metPopulator from '../frontend/updater';

const propStatus = {
  boxes: document.getElementsByClassName('status'),
};

const metStatus = {
  init() {
    for (let i = 0; i < propStatus.boxes.length; i += 1) {
      propStatus.boxes[i].addEventListener('change', () => { metStatus.updateStatus(propStatus.boxes[i], i); });
    }
  },

  updateStatus(item, index) {
    const newDict = metPopulator.sortStorage();
    newDict[index][1] = item.checked;
    localStorage.clear();
    for (let i = 0; i < newDict.length; i += 1) {
      const obj = { description: newDict[i][0], status: newDict[i][1], index: newDict[i][2] };
      metPopulator.updateStorage(obj);
    }

    metPopulator.updateDOM();
  },
};

export default metStatus;