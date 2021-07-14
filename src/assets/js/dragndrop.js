const propDrag = {
  items: document.getElementsByTagName('li'),
};

const metDrag = {
  init() {
    for (let i = 0; i < propDrag.items.length; i += 1) {
      propDrag.items[i].addEventListener('dragstart', () => {propDrag.items[i].classList.add('ontop');}); 
      propDrag.items[i].addEventListener('drop', () => {metDrag.dropOut(propDrag.items[i]);}); 
      propDrag.items[i].addEventListener('dragover', (e) => {metDrag.onBottom(e, propDrag.items[i])});
      propDrag.items[i].addEventListener('dragleave', () => {propDrag.items[i].classList.remove('onbottom');});
    }    
  },

  dropOut(item) {
    console.log(item)
  },

  onBottom(e,item) {
    e.preventDefault();
    item.classList.add('onbottom'); 
  },
};

export default metDrag;