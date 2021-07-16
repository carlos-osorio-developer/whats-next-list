import metPopulator from '../frontend/updater';

const propDelete = {
  container: document.getElementsByTagName('ul')[0],
  items: document.getElementsByTagName('li'),
};

const metDelete = {
  deleteItem(icon) {
    const li = icon.parentNode;

    // var old_element = document.getElementById("btn");
    let new_li = li.cloneNode(true);
    li.parentNode.replaceChild(new_li, li);

    const index = Array.prototype.indexOf.call(propDelete.container.children, li);
    const newDict = metPopulator.getStorage();
    newDict.splice(index, 1);
    console.log(newDict);

    localStorage.clear();
    for (let i = 0; i < newDict.length; i += 1) {
      const obj = { description: newDict[i][0], status: newDict[i][1], index: i };
      metPopulator.updateStorage(obj);
    }

    console.log(localStorage);

    new_li.remove();
    // setTimeout(() => { metPopulator.updateDOM(); }, 80);
  },
};

export default metDelete;

const dragIcon = propName.items[index].lastElementChild;
    dragIcon.style.display = 'none';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';
    propName.items[index].appendChild(deleteIcon);