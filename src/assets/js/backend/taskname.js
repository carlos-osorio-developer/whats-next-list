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

    const dragIcon = propName.items[index].lastElementChild;
    dragIcon.style.display = 'none';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';
    propName.items[index].appendChild(deleteIcon);

    deleteIcon.addEventListener('click', () => { console.log('holaaa') })
    inputField.addEventListener('focusout', () => { metName.updateName(pElement, inputField, index, dragIcon, deleteIcon); });
    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        metName.updateName(pElement, inputField, index, dragIcon, deleteIcon);
      }
    });
    propName.items[index].firstChild.appendChild(inputField);
    inputField.focus();    
  },

  updateName(p, input, index, dotsIcon, thrashIcon) {
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

    thrashIcon.remove();
    dotsIcon.style.display = 'block';
    
    metPopulator.updateDOM();
  },
};

export default metName;