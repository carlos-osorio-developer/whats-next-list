import '../css/style.scss';

import metListen from './frontend/initializer';
import tasks from './backend/tasks';

if (!localStorage.getItem('index')) {
  for (let i = 0; i < tasks.length; i += 1) {
    metListen.updateStorage(tasks[i]);
  }
  metListen.createDOM();
} else {
  metListen.createDOM();
}
