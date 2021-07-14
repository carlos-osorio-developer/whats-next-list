const propDrag = {
  items: document.getElementsByTagName('li'),
};

const metDrag = {
  init() {
    for (let i = 0; i < propDrag.items.length; i += 1) {
      propDrag.items[i].addEventListener('dragstart', function() {metDrag.dragging(i)});  
      propDrag.items[i].addEventListener('dragover', function(e) {metDrag.onBottom(e, propDrag.items[i])});
      propDrag.items[i].addEventListener('dragleave', () => {propDrag.items[i].classList.remove('onbottom');});
    }    
  },

  dragging(i) {
    console.log('estoy volandoooo '+i)
  },

  onBottom(e,item) {
    e.preventDefault();
    item.classList.add('onbottom'); 
  },
};

export default metDrag;