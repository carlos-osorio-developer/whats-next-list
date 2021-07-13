const propPopulator = {
  container: document.getElementsByTagName('ul')[0],  
}

export const metPopulator = {
  updateStorage(obj) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
      let key = Object.keys(obj)[i];
      let arr = localStorage.getItem(key) ? localStorage.getItem(key).split(',') : [];      
      arr.push(obj[key]);      
      localStorage.setItem(key, arr);         
    }
  },

  fill(obj) {
    metPopulator.updateStorage(obj);    
  },

  sortStorage() {
    const descr = localStorage.getItem('description') ? localStorage.getItem('description').split(',') : [];    
    const status = localStorage.getItem('status') ? localStorage.getItem('status').split(',') : [];
    const index = localStorage.getItem('index') ? localStorage.getItem('index').split(',') : [];
    let dictionary = []
    for (let i = 0; i < index.length; i++) {
      dictionary[i] = [descr[i], status[i], index[i]];      
    }
    dictionary.sort((a, b) => ((a[2] > b[2]) ? 1 : -1));
    return dictionary;
  },

  updateDOM() {    
    let items = metPopulator.sortStorage();
    items.forEach((item)=>{
      const li = document.createElement('li');
      li.innerHTML = `<nav><input type='checkbox' name='completed'><p>${item[0]}</p></nav><i class="fas fa-ellipsis-v"></i>`;
      const ul = propPopulator.container;
      console.log(li);
      ul.appendChild(li);
    });    
  },
}