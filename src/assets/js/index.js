import '../css/style.scss';
const tasks = [
  { description: 'sleep', status: false, index: 2 },
  { description: 'eat', status: false, index: 0 },
  { description: 'code', status: false, index: 1 },
];

import { metPopulator } from './populator';

if(!localStorage.getItem('index')){
  for (let i = 0; i < tasks.length; i++) {
    metPopulator.fill(tasks[i]);  
  }  
  metPopulator.updateDOM();
}
else {
  metPopulator.updateDOM();
}

