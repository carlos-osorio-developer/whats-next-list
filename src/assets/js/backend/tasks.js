import metListen from '../frontend/initializer';

const propTasks = {
  addBtn: document.getElementsByClassName('fa-calendar-plus')[0],
  addField: document.getElementById('name-field'),
};

const metTasks = {
  init() {
    propTasks.addBtn.addEventListener('click', () => {metTasks.create()})
  },

  create() {
    if(propTasks.addField.value === '') {
      propTasks.addField.classList.add('error-msg');
      propTasks.addField.setAttribute('placeholder', 'Please enter task description here');
    }
    else {
      console.log('No tan vacío jeje')
    }
  },
};

export default metTasks;