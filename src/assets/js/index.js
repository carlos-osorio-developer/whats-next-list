import '../css/style.scss';

import metPopulator from './populator';
import tasks from './tasks'
import metStatus from './status'

if (!localStorage.getItem('index')) {
  for (let i = 0; i < tasks.length; i += 1) {
    metPopulator.updateStorage(tasks[i]);
  }
  metPopulator.updateDOM();
} else {
  metPopulator.updateDOM();
}

metStatus.init();