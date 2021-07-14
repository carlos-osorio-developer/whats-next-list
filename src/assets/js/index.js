import '../css/style.scss';

import metPopulator from './populator';
import metDrag from './dragndrop';

const tasks = [
  { description: 'sleep', status: false, index: 2 },
  { description: 'eat', status: false, index: 0 },
  { description: 'code', status: false, index: 1 },
];

if (!localStorage.getItem('index')) {
  for (let i = 0; i < tasks.length; i += 1) {
    metPopulator.fill(tasks[i]);
  }
  metPopulator.updateDOM();
} else {
  metPopulator.updateDOM();
}

metDrag.init();