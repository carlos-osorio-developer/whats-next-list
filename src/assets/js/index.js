import '../css/style.css';
const tasks = [
  { description: 'eat', completed: false, index: 0 },
  { description: 'sleep', completed: false, index: 1 },
  { description: 'code', completed: false, index: 2 },
];

import { metPopulator } from './populator';
metPopulator.init();