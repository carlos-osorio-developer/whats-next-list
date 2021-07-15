import metPopulator from '../frontend/updater';

const propName = {
  items: document.getElementsByTagName('li'),
};

const metName = {
  editName(index) {
    propName.items[index].setAttribute('draggable', 'false');
    const pElement = propName.items[index].firstChild.lastChild;
    pElement.style.display = 'none';
    const inputField = document.createElement('input');
    inputField.className = 'input-field';
    inputField.value = pElement.textContent;
    inputField.addEventListener('focusout', () => { metName.updateName(pElement, inputField, index); });
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        metName.updateName(pElement, inputField, index);
      }
    });
    propName.items[index].firstChild.appendChild(inputField);
    inputField.focus();
  },

  updateName(p, input, index) {
    const newDict = metPopulator.getStorage();
    newDict[index][0] = input.value;
    localStorage.clear();
    for (let i = 0; i < newDict.length; i += 1) {
      const obj = { description: newDict[i][0], status: newDict[i][1], index: newDict[i][2] };
      metPopulator.updateStorage(obj);
    }
    input.remove();
    p.style.display = 'block';
    propName.items[index].setAttribute('draggable', 'true');
    metPopulator.updateDOM();
  },
};

export default metName;