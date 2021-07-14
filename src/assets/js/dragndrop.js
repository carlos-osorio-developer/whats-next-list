import tasks from './tasks'
import metPopulator from './populator';

const propDrag = {
  items: document.getElementsByTagName('li'),
  container: document.getElementsByTagName('ul')[0],
};

const metDrag = {
  init() {
    for (let i = 0; i < propDrag.items.length; i += 1) {
      propDrag.items[i].addEventListener('dragstart', () => {propDrag.items[i].classList.add('ontop');}); 
      propDrag.items[i].addEventListener('drop', () => {metDrag.dropOut(i);}); 
      propDrag.items[i].addEventListener('dragover', (e) => {metDrag.onBottom(e, propDrag.items[i])});
      propDrag.items[i].addEventListener('dragleave', () => {propDrag.items[i].classList.remove('onbottom');});
    }    
  },

  dropOut(newIndex) {
    const dragged = document.getElementsByClassName('ontop')[0];
    const hovered = document.getElementsByClassName('onbottom')[0];
    const oldIndex = Array.prototype.indexOf.call(propDrag.container.children, dragged);
    let newDict = metPopulator.sortStorage();    
    const draging = newDict.splice(oldIndex, 1);
    newDict.splice(newIndex, 0, draging[0]);
    localStorage.clear();    
    for (let i = 0; i < newDict.length; i += 1) {      
      const obj = {description: newDict[i][0], status: newDict[i][1], index: newDict[i][2]}
      metPopulator.fill(obj);      
    }
    dragged.classList.remove('ontop');
    hovered.classList.remove('onbottom');
    metPopulator.updateDOM();
  },

  onBottom(e,item) {
    e.preventDefault();
    item.classList.add('onbottom'); 
  },
};

export default metDrag;