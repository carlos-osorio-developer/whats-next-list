import '../css/style.scss';

import metPopulator from './populator';
import tasks from './tasks'

if (!localStorage.getItem('index')) {
  for (let i = 0; i < tasks.length; i += 1) {
    metPopulator.fill(tasks[i]);
  }
  metPopulator.updateDOM();
} else {
  metPopulator.updateDOM();
}
