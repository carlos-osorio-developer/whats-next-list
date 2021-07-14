import metDrag from './dragndrop';
import metStatus from './status';

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
    propPopulator.container.innerHTML = '';
    const items = metPopulator.sortStorage();    
    for (let i = 0; i < items.length; i += 1) {
      const li = document.createElement('li');
      li.draggable = true;      
      const checked = items[i][1]=='true' ? 'checked' : '';
      li.innerHTML = `<nav><input type='checkbox' ${checked} class='status' name='completed'><p>${items[i][0]}</p></nav><i class="fas fa-ellipsis-v"></i>`;
      const ul = propPopulator.container;
      ul.appendChild(li);
      li.addEventListener('dragstart', () => {li.classList.add('ontop');}); 
      li.addEventListener('drop', () => {metDrag.dropOut(i);}); 
      li.addEventListener('dragover', (e) => {metDrag.onBottom(e, li)});
      li.addEventListener('dragleave', () => {li.classList.remove('onbottom');}); 
      metStatus.init();
    } 
  },
};

export default metPopulator;