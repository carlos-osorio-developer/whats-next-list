import metListen from '../frontend/initializer';

const propTasks = {
  addBtn: document.getElementsByClassName('fa-calendar-plus')[0],
  addField: document.getElementById('name-field'),
  index: 0,
};

const metTasks = {

  create() {
    if(propTasks.addField.value === '') {
      propTasks.addField.classList.add('error-msg');
      propTasks.addField.setAttribute('placeholder', 'Please enter task description here');
    }
    else {
      propTasks.addField.classList.remove('error-msg');
      propTasks.addField.setAttribute('placeholder', 'Add to your list...');
      const obj = { description: propTasks.addField.value, status: false, index: propTasks.index };
      metListen.updateStorage(obj);
      propTasks.index += 1;
      propTasks.addField.value='';
    }
  },
};

export default metTasks;