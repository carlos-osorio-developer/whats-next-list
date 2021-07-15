import metListen from '../frontend/initializer';

const propTasks = {
  addBtn: document.getElementsByClassName('fa-calendar-plus')[0],
  addField: document.getElementById('name-field'),  
};

const metTasks = {

  create() {
    if (propTasks.addField.value === '') {
      propTasks.addField.classList.add('error-msg');
      propTasks.addField.setAttribute('placeholder', 'Please enter task description here');
    } else {
      propTasks.addField.classList.remove('error-msg');
      propTasks.addField.setAttribute('placeholder', 'Add to your list...');
      const indexarr = localStorage.getItem('index') ? localStorage.getItem('index').split(',') : [];
      const lastindex = indexarr.length == 0 ? 0 : indexarr.length;
      console.log(indexarr)
      console.log(indexarr.length)
      console.log(indexarr.length == 0)
      const obj = { description: propTasks.addField.value, status: false, index: lastindex };
      metListen.updateStorage(obj);
      propTasks.index += 1;
      propTasks.addField.value = '';
    }
  },
};

export default metTasks;