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
    propName.items[index].firstChild.appendChild(inputField);
    inputField.focus();

    const thrash = propName.items[index].lastChild;
    const dots = propName.items[index].getElementsByClassName('fa-ellipsis-v')[0];
    dots.classList.add('invisible');
    thrash.classList.remove('invisible');

    inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        metName.updateName(pElement, inputField, index, dots, thrash);
      }
    });
  },

  updateName(p, input, index, dots, thrash) {
    const newDict = metPopulator.getStorage();
    newDict[index][0] = input.value;
    localStorage.clear();
    for (let i = 0; i < newDict.length; i += 1) {
      const obj = { description: newDict[i][0], status: newDict[i][1], index: newDict[i][2] };
      metPopulator.updateStorage(obj);
    }

    if (propName.items[index].firstChild.contains(input)) {
      propName.items[index].firstChild.removeChild(input);
    }
    p.style.display = 'block';
    propName.items[index].setAttribute('draggable', 'true');

    dots.classList.remove('invisible');
    thrash.classList.add('invisible');

    metPopulator.updateDOM();
  },
};

export default metName;